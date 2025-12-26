## Curl

    curl -v http://localhost:3000/api/todos
    
    curl -v -H "Content-Type: application/json" -d '{"text": "feed the cats", "completed": "false", "completedAt": null }' http://localhost:3000/api/todos