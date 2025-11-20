import os
import json
from dotenv import load_dotenv
load_dotenv()
from openai import OpenAI

print('GITHUB_TOKEN present:', bool(os.environ.get('GITHUB_TOKEN')))

try:
    client = OpenAI(base_url="https://models.github.ai/inference", api_key=os.environ.get('GITHUB_TOKEN'))
    print('Client created:', client is not None)
    messages = [
        {"role": "system", "content": "You are a test."},
        {"role": "user", "content": "Say hello."}
    ]
    print('Attempting chat completion...')
    res = client.chat.completions.create(messages=messages, model="openai/gpt-4o", temperature=0.0, max_tokens=10, )
    print('Response:', res)
except Exception as e:
    import traceback
    print('Exception during API call:')
    traceback.print_exc()
    print('repr:', repr(e))
