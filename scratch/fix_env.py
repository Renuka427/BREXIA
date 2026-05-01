import subprocess
import os

keys = {
    "GOOGLE_GENAI_API_KEY": "AIzaSyCzMFI_5BVs2Lxvh43orVGkrLBb6sCuGA4",
    "NEXT_PUBLIC_SUPABASE_URL": "https://uifcfdtfimimyaivqnbz.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZmNmZHRmaW1pbXlhaXZxbmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTQzNjAsImV4cCI6MjA5MTczMDM2MH0.FCYvjirwrI8ZqYgrPb9bKQkC3VNg3g8iEN-Lh6bAmUw",
    "SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZmNmZHRmaW1pbXlhaXZxbmJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjE1NDM2MCwiZXhwIjoyMDkxNzMwMzYwfQ._NR4ia2CWEph-2Xrp6eb46Y9ZdD2KJj_1uNyAOOTk7g"
}

cwd = r"c:\Users\renuk\OneDrive\Desktop\BREXIA_F\brexia-app"

for k, v in keys.items():
    print(f"Adding {k}...")
    # Remove existing
    subprocess.run(["npx", "vercel", "env", "rm", k, "production", "--yes"], cwd=cwd, shell=True)
    # Add new
    p = subprocess.Popen(["npx", "vercel", "env", "add", k, "production"], 
                         stdin=subprocess.PIPE, 
                         cwd=cwd, 
                         shell=True)
    p.communicate(input=v.encode())
    print(f"Done {k}.")
