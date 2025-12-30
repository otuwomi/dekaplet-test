#!/usr/bin/env python3
"""
Backend API Testing for Dekaplet
Tests all backend endpoints as specified in the review request
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env file: {e}")
        return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("ERROR: Could not get REACT_APP_BACKEND_URL from frontend/.env")
    sys.exit(1)

print(f"Testing backend at: {BACKEND_URL}")

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "errors": []
}

def log_test(test_name, success, message=""):
    """Log test results"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {test_name}")
    if message:
        print(f"   {message}")
    
    if success:
        test_results["passed"] += 1
    else:
        test_results["failed"] += 1
        test_results["errors"].append(f"{test_name}: {message}")

def test_health_check():
    """Test GET /api/health endpoint"""
    try:
        response = requests.get(f"{BACKEND_URL}/api/health", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "healthy":
                log_test("Health Check", True, f"Status: {data.get('status')}")
                return True
            else:
                log_test("Health Check", False, f"Expected status 'healthy', got: {data.get('status')}")
                return False
        else:
            log_test("Health Check", False, f"HTTP {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        log_test("Health Check", False, f"Exception: {str(e)}")
        return False

def test_root_endpoint():
    """Test GET /api/ endpoint"""
    try:
        response = requests.get(f"{BACKEND_URL}/api/", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "Dekaplet" in data["message"]:
                log_test("Root Endpoint", True, f"Message: {data.get('message')}")
                return True
            else:
                log_test("Root Endpoint", False, f"Expected message about Dekaplet API, got: {data}")
                return False
        else:
            log_test("Root Endpoint", False, f"HTTP {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        log_test("Root Endpoint", False, f"Exception: {str(e)}")
        return False

def test_contact_form_submission():
    """Test POST /api/contact endpoint"""
    test_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "company": "Test Company",
        "phone": "+1234567890",
        "interest": "business",
        "message": "I want to integrate Dekaplet"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/contact",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            # Verify all fields are present in response
            required_fields = ["id", "name", "email", "company", "phone", "interest", "message", "created_at", "status"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if not missing_fields:
                # Verify data matches what we sent
                if (data["name"] == test_data["name"] and 
                    data["email"] == test_data["email"] and
                    data["company"] == test_data["company"] and
                    data["phone"] == test_data["phone"] and
                    data["interest"] == test_data["interest"] and
                    data["message"] == test_data["message"]):
                    log_test("Contact Form Submission", True, f"Contact ID: {data.get('id')}")
                    return True, data
                else:
                    log_test("Contact Form Submission", False, "Response data doesn't match submitted data")
                    return False, None
            else:
                log_test("Contact Form Submission", False, f"Missing fields in response: {missing_fields}")
                return False, None
        else:
            log_test("Contact Form Submission", False, f"HTTP {response.status_code}: {response.text}")
            return False, None
            
    except Exception as e:
        log_test("Contact Form Submission", False, f"Exception: {str(e)}")
        return False, None

def test_get_contact_forms():
    """Test GET /api/contact endpoint"""
    try:
        response = requests.get(f"{BACKEND_URL}/api/contact", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                log_test("Get Contact Forms", True, f"Retrieved {len(data)} contact forms")
                return True, data
            else:
                log_test("Get Contact Forms", False, f"Expected list, got: {type(data)}")
                return False, None
        else:
            log_test("Get Contact Forms", False, f"HTTP {response.status_code}: {response.text}")
            return False, None
            
    except Exception as e:
        log_test("Get Contact Forms", False, f"Exception: {str(e)}")
        return False, None

def test_newsletter_subscription():
    """Test POST /api/newsletter endpoint"""
    test_email = f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
    test_data = {
        "email": test_email
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/newsletter",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "email", "subscribed_at"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if not missing_fields:
                if data["email"] == test_email:
                    log_test("Newsletter Subscription", True, f"Subscription ID: {data.get('id')}")
                    return True, data
                else:
                    log_test("Newsletter Subscription", False, "Response email doesn't match submitted email")
                    return False, None
            else:
                log_test("Newsletter Subscription", False, f"Missing fields in response: {missing_fields}")
                return False, None
        else:
            log_test("Newsletter Subscription", False, f"HTTP {response.status_code}: {response.text}")
            return False, None
            
    except Exception as e:
        log_test("Newsletter Subscription", False, f"Exception: {str(e)}")
        return False, None

def test_newsletter_duplicate_subscription():
    """Test duplicate newsletter subscription (should fail with 400)"""
    test_email = "duplicate@example.com"
    test_data = {
        "email": test_email
    }
    
    try:
        # First subscription
        response1 = requests.post(
            f"{BACKEND_URL}/api/newsletter",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        # Second subscription (should fail)
        response2 = requests.post(
            f"{BACKEND_URL}/api/newsletter",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response1.status_code == 200 and response2.status_code == 400:
            log_test("Newsletter Duplicate Prevention", True, "Correctly rejected duplicate subscription")
            return True
        else:
            log_test("Newsletter Duplicate Prevention", False, 
                    f"First: HTTP {response1.status_code}, Second: HTTP {response2.status_code}")
            return False
            
    except Exception as e:
        log_test("Newsletter Duplicate Prevention", False, f"Exception: {str(e)}")
        return False

def verify_contact_form_in_list(submitted_contact, contact_list):
    """Verify that the submitted contact form appears in the retrieved list"""
    if not submitted_contact or not contact_list:
        return False
    
    submitted_id = submitted_contact.get("id")
    for contact in contact_list:
        if contact.get("id") == submitted_id:
            log_test("Contact Form in List Verification", True, f"Found submitted contact in list")
            return True
    
    log_test("Contact Form in List Verification", False, "Submitted contact not found in retrieved list")
    return False

def main():
    """Run all backend API tests"""
    print("=" * 60)
    print("DEKAPLET BACKEND API TESTING")
    print("=" * 60)
    print()
    
    # Test 1: Health Check
    print("1. Testing Health Check Endpoint...")
    test_health_check()
    print()
    
    # Test 2: Root Endpoint
    print("2. Testing Root Endpoint...")
    test_root_endpoint()
    print()
    
    # Test 3: Contact Form Submission
    print("3. Testing Contact Form Submission...")
    success, submitted_contact = test_contact_form_submission()
    print()
    
    # Test 4: Get Contact Forms
    print("4. Testing Get Contact Forms...")
    success, contact_list = test_get_contact_forms()
    print()
    
    # Test 5: Verify submitted contact is in the list
    if submitted_contact and contact_list:
        print("5. Verifying Contact Form in List...")
        verify_contact_form_in_list(submitted_contact, contact_list)
        print()
    
    # Test 6: Newsletter Subscription
    print("6. Testing Newsletter Subscription...")
    test_newsletter_subscription()
    print()
    
    # Test 7: Newsletter Duplicate Prevention
    print("7. Testing Newsletter Duplicate Prevention...")
    test_newsletter_duplicate_subscription()
    print()
    
    # Summary
    print("=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    print(f"Total Tests: {test_results['passed'] + test_results['failed']}")
    print(f"Passed: {test_results['passed']}")
    print(f"Failed: {test_results['failed']}")
    
    if test_results["errors"]:
        print("\nFAILED TESTS:")
        for error in test_results["errors"]:
            print(f"  - {error}")
    
    print()
    if test_results["failed"] == 0:
        print("🎉 ALL TESTS PASSED!")
        return 0
    else:
        print("❌ SOME TESTS FAILED!")
        return 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)