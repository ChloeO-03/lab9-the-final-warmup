# ADR 002: Using LocalStorage

## Status
Accepted

## Context
Need to save todos between sessions. Options: LocalStorage, IndexedDB, Backend API.

## Decision
Use LocalStorage with a service wrapper.

## Why

**LocalStorage Pros:**
- Simple API
- Synchronous (easier to use)
- No server needed
- Fast
- 5MB is plenty for todos

**Service wrapper:**
- Easy to test with mocks
- Can swap later if needed
- Error handling in one place

## Result
Simple persistence with clean abstraction. Can upgrade to backend later if needed.