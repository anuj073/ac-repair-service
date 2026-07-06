#!/usr/bin/env bash
# Render start script for backend
set -e

echo "=== AC Repair Backend - Render Deploy ==="
echo "Running prisma generate..."
npx prisma generate

echo "Running prisma db push..."
npx prisma db push --accept-data-loss 2>/dev/null || echo "DB push skipped (table exists)"

echo "Starting server..."
node dist/server.js