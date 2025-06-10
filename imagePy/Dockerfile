FROM mcr.microsoft.com/azure-functions/python:4-python3.11
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 7071
CMD ["func", "start", "--python"]