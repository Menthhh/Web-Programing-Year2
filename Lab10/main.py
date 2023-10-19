import requests

url = 'http://161.246.5.61:11610/students/html'
resonse = requests.get(url)

if resonse.status_code == 200:
    print("Request success")
    print("Response: ",resonse.text)
else:
    print("Request failed. Status code: ",resonse.status_code)
    
    

