# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Health Check
**GET /health**

Returns the health status of the platform.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

### Get Available Tests
**GET /tests**

Returns a list of all available assessment tools.

**Response:**
```json
[
  {
    "id": "aq-test",
    "name": "Autism Spectrum Quotient (AQ)",
    "description": "A self-assessment questionnaire to measure autistic traits in adults",
    "type": "questionnaire",
    "ageRange": "16+",
    "duration": "10-15 minutes",
    "questionCount": 5
  }
]
```

### Start Assessment Session
**POST /assessment/start**

Starts a new assessment session.

**Request Body:**
```json
{
  "testId": "aq-test",
  "participantInfo": {},
  "userAgent": "Mozilla/5.0...",
  "language": "en",
  "timezone": "UTC"
}
```

**Response:**
```json
{
  "sessionId": "session_1234567890_abcdef",
  "message": "Assessment session started"
}
```

### Get Session Status
**GET /assessment/{sessionId}**

Returns the current status of an assessment session.

**Response:**
```json
{
  "sessionId": "session_1234567890_abcdef",
  "testInfo": {
    "id": "aq-test",
    "name": "Autism Spectrum Quotient (AQ)",
    "description": "A self-assessment questionnaire...",
    "type": "questionnaire"
  },
  "progress": {
    "currentQuestion": 1,
    "totalQuestions": 5,
    "percentage": 20
  },
  "currentQuestion": {
    "id": "aq1",
    "text": "I prefer to do things with others rather than on my own.",
    "category": "social_skills",
    "reverse": true
  },
  "status": "active",
  "canSubmit": false
}
```

### Submit Answer
**POST /assessment/{sessionId}/answer**

Submits an answer for the current question.

**Request Body:**
```json
{
  "value": "3"
}
```

**Response:**
```json
{
  "success": true,
  "nextQuestion": {
    "id": "aq2",
    "text": "I prefer to do things the same way over and over again.",
    "category": "attention_switching",
    "reverse": false
  },
  "progress": {
    "currentQuestion": 2,
    "totalQuestions": 5,
    "percentage": 40
  }
}
```

**Completion Response:**
```json
{
  "success": true,
  "completed": true,
  "results": {
    "totalScore": 3,
    "maxScore": 5,
    "interpretation": "Moderate likelihood of autism spectrum traits",
    "details": "Score based on agreement with autistic traits"
  },
  "sessionSummary": {
    "testId": "aq-test",
    "duration": 8,
    "questionsAnswered": 5,
    "completedAt": "2024-01-01T00:08:00.000Z"
  }
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error