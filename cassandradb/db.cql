DROP KEYSPACE IF EXISTS restaurantmenu;
CREATE KEYSPACE restaurantmenu WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1 };
