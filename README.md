# Web Jeopardy
Simplified version of the forked repo originally here: https://github.com/digitaltom/web-jeopardy

The questions are defined in `jeopardy-data.json`, the answers can be defined inline, or as
separate html files (in the `answers/` folder).

## Run

Run webserver using (from root directory)

```
python3 -m http.server
```

Use separate buzzer app to let people buzz in:

https://github.com/bufferapp/buzzer

(then use localtunnel `lt` to provide public address for buzzer)
