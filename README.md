# basic-auth-proxy-server

A simple http proxy server with basic auth

## Usage

```
npm install -g basic-auth-proxy-server
basic-auth-proxy-server 3000 http://localhost:8000 your-name:your-password
```

## How does it work ?

```

+--------+ --- access without authorization ---> +-------------------------+        +---------+
| client |                                       | basic-auth-proxy-server |        | backend |
+--------+ <--------- access denied ------------ +-------------------------+        +---------+

+--------+ ----- access with authorization ----> +-------------------------+ -----> +---------+
| client |                                       | basic-auth-proxy-server |        | backend |
+--------+ <------ response from backend ------- +-------------------------+ <----- +---------+

```

## License

MIT
