# FourCourses Restaurant Menu Microservice

FourCourses' restaurant menu microservice was scaled using AWS EC2 instances. At peak traffic, the architecture comfortably supported a throughput of 19,500+ Requests Per Second (scaled from 1.9K RPS) with an average response latency of 65ms and 0% error rate.

For the menu component, high read speeds and reliability is paramount because the menu is a primary factor to make a decision to dine at a venue. Under high traffic periods, like Restaurant Week, the component needs to be able to scale accordingly.

## Architecture Evolution Details

### Step 1: Database Candidates & Selection

PostgreSQL was chosen as the RDBMS candidate due to its low read latencies and efficient [multi-version concurrency control (MVCC)](https://en.wikipedia.org/wiki/Multiversion_concurrency_control) implementation for better throughput. Cassandra was chosen as the NoSQL DBMS candidate due to its high availability and near linear scalability.

Postgres and Cassandra queries were executed as prepared statements. Cassandra had Row Cache enabled with Replication Factor set to 3. Both databases were seeded with 10 million restaurant menus to replicate production usage. Below shows the querying times within both database instances to quickly compare performance for a simple SELECT (read) query.

#### PostgreSQL:
![Image%202019-04-23%20at%208.39.15%20PM.png](https://cl.ly/e74ec0f4d53e/Image%202019-04-23%20at%208.39.15%20PM.png)

#### Cassandra:
![Image%202019-05-22%20at%208.33.05%20AM.png](https://cl.ly/cbcb60036b8b/Image%202019-05-22%20at%208.33.05%20AM.png)

#### Bottomline
| Database    | Read latency | 
| ----------- | ------------ |
| PostgreSQL  | 1.278 ms     |
| CassandraDB | 1.172 ms     |

Cassandra was chosen as the database for the project. While the read latencies for both were similar, one additional consideration is the fact that restaurant menus are highly unstructured and the flexibility in the schema design to handle this was a plus.

At this point, it was time to perform a stress test with the following setup (all using AWS t2.micro EC2 instances) to get baseline results: 
- a proxy server with all related microservices
- a nginx server managing menu-specific requests from the proxy server to two menu-specific servers, which are linked to...
- our original Cassandra instance

Stress testing is one of the ways to [build confidence in a system's capability](http://principlesofchaos.org/) to handle production abnormalities. As seen below, the setup was able to push **~1.9K RPS with an average latency of ~60ms**. Equal time was split between the server and database.

#### Baseline results
![Image%202019-04-27%20at%2011.22.42%20AM.png](https://cl.ly/4a0f4d206d73/Image%202019-04-27%20at%2011.22.42%20AM.png)


### Step 2: Implementing Redis

Redis key-value in-memory cache was used to add another layer of scalability between the proxy server and rest of the architecture. Restaurant menus requested from the client would now first ping the Redis cache before the database. If not found in the cache, the database would be queried, the response would be completed, and then the Redis cache would be augmented with the key-value pair.

Next time around, the database would not be queried because the cache would contain the item.

#### Stress testing with Redis cache:
From observing Loader.io's dashboard [here](https://cl.ly/17057a981a3a/Image%202019-05-02%20at%207.09.20%20PM.png), the left part of the graph has latency climbing as redis begins caching the randomized requests; but soon after values have been cached, the right side of the graph shows low latency from cache hitting.

#### Upgraded results: When a large percentage of data became cached, latency time dropped to ~15ms, and throughput increased from 1.9K RPS to 3.1K RPS.

![Image%202019-04-30%20at%203.31.05%20PM.png](https://cl.ly/64385df3fca1/Image%202019-04-30%20at%203.31.05%20PM.png)

### Step 3: Implementing Nginx Load Balancer, a tale of horizontal vs vertical scaling

Two more proxy servers were spun up using t2.micro EC2 instances. Another t2.micro instance was configured to run Nginx Load Balancer. Round robin was set to send requests in sequential order to each of the 3 proxy servers. It was expected that with two more proxy servers the throughput would significantly increase, but it consistently stalled at 3.3K RPS, barely 200RPS more than using the one proxy server in the previous setup.

When horizontal scaling brings diminishing returns, the biggest bottleneck/opportunity may exist elsewhere. 

Checking the request latency log in loader.io and New Relic, it looked nominal with requests still <100ms. Checking the task manager, all 3 proxy servers had their equal three-way share of workload, which means Nginx's round robin system is working as intended. However, these servers were hardly pushed to their CPU limits. Looking at the process management on the Nginx instance ([see under column %CPU for "nginx"](https://cl.ly/cff937690f86/Image%202019-05-03%20at%204.45.04%20PM.png)), the instance capped at ~87%.

The Nginx instance potentially was compromising the setup. Some investigation showed that t2.micro instances are CPU "burstable" as long as it has [CPU credits](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-credits-baseline-concepts.html), which enforces some period of throttling before it can burst again. This did not provide the performance reliability nor the consistent returns expected from horizontally scaling the proxy servers. 

The Nginx instance was upgraded to a [C5.large instance](https://aws.amazon.com/blogs/aws/now-available-compute-intensive-c5-instances-for-amazon-ec2/), which as of this writing is the cheapest EC2 instance that optimizes around compute power and networking for intense workloads. This circumvented the CPU throttling and throughput scaled accordingly when this change was done. 

#### Upgraded results: Latency maintained at ~15ms and throughput pushed from the compromised 3.3K RPS to 10.5K RPS. Yay!

### Step 4: Additional scaling and optimizations in the quest for higher RPS

With Nginx throttling handcuffs now off, more proxy servers were added to see what the setup can handle. The final setup is as followed:
- 1 Nginx load balancer managing traffic for proxy servers
- 8 proxy servers
- 1 Redis server
- 1 Nginx server managing traffic for menu-specific servers
- 2 menu-specific servers
- 1 Cassandra database

At this point, two loader.io accounts were used to further continue stress testing with maxed out 10K clients requesting per minute via each account. Additional optimizations were also done to the default Redis and Nginx configurations as they were higher on the stack, therefore potentially having greater impact to the client.

### Final thoughts:

#### Final results
The setup ultimately managed **19.5K RPS with 0% error rate and average latency of 65ms**. Both loader.io accounts ran simultaneously with similar results as screenshotted for one of the accounts below.

![Image%202019-05-03%20at%205.09.07%20PM.png](https://cl.ly/dd17958a27e3/Image%202019-05-03%20at%205.09.07%20PM.png)

Further steps with more budget/time could involve: 
1. Using a paid loader.io account which grants 50k client request per minute to further stress the final setup and see where new bottlenecks arise.
2. Take advantage of Nginx's caching capabilities.
3. Migrate [servers](https://medium.com/the-node-js-collection/node-js-can-http-2-push-b491894e1bb1) and [Nginx](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-18-04) to [HTTP2](https://developers.google.com/web/fundamentals/performance/http2/) to take advantage of its protocol advantages like [auto-push](https://www.npmjs.com/package/h2-auto-push).
4. Explore utilizing a CDN (like AWS CloudFront) to reduce workload spent on static content.
5. Providing higher availability by eliminating single point of failure (i.e. horizontally scaling Redis and Cassandra for performance and redundancy).

This was a fun project to work on. I hope I can work on something similar in the future!

## Related Microservices

  - [Overview Module](https://github.com/fourcourses/overview-module)
  - [Reviews Module](https://github.com/fourcourses/Reviews-module)
  - [Sidebar Module](https://github.com/fourcourses/sidebar_module)


## About FourCourses

> FourCourses is a food review platform where users can place reservations online for hundreds of restaurants around their area.
