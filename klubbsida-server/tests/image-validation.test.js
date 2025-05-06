/**
 * Image Validation Tests
 * 
 * These tests verify that the server correctly validates image uploads
 * for news posts according to the specified requirements.
 */

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const app = express();
const News = require('../models/News');

// Mock middleware
jest.mock('../middleware/jwtCheck', () => {
  return (req, res, next) => next();
});

jest.mock('../middleware/roleCheck', () => {
  return (req, res, next) => next();
});

// Setup Express app
app.use(express.json({ limit: '10mb' }));
const newsRoutes = require('../routes/news');
app.use('/api/news', newsRoutes);

// Sample base64 encoded images (mocked)
const validWebpImage = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
const invalidFormatImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKAP/2Q==';

describe('Image Validation', () => {
  let mongoServer;
  
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true });
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  
  beforeEach(async () => {
    await News.deleteMany({});
  });
  
  test('should accept valid webp cover image', async () => {
    const response = await request(app)
      .post('/api/news')
      .send({
        title: 'Test News',
        content: 'Test content',
        coverpage: validWebpImage
      });
    
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test News');
    expect(response.body.coverpage).toBe(validWebpImage);
  });
  
  test('should reject non-webp cover image', async () => {
    const response = await request(app)
      .post('/api/news')
      .send({
        title: 'Test News',
        content: 'Test content',
        coverpage: invalidFormatImage
      });
    
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('webp');
  });
  
  test('should require coverpage', async () => {
    const response = await request(app)
      .post('/api/news')
      .send({
        title: 'Test News',
        content: 'Test content'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('coverpage');
  });
  
  test('should accept optional content image', async () => {
    const response = await request(app)
      .post('/api/news')
      .send({
        title: 'Test News',
        content: 'Test content',
        coverpage: validWebpImage,
        contentImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
      });
    
    expect(response.status).toBe(201);
    expect(response.body.contentImage).toBeTruthy();
  });
});