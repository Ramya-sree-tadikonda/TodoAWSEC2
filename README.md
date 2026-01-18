AWS EC2 Instance:
Manually creating of EC2 Instance in AWS Console
Step 1: Create an EC2 Instance
1.	Log in to the AWS Management Console.
2.	Navigate to EC2 → Launch Instance.
3.	Select an Ubuntu AMI.
4.	Choose an instance type (for example, t2.micro,t2.large).
5.	Create and download a key pair (.pem file).
6.	Configure the security group to allow:
o	SSH (port 22)
o	Application port (8085)
7.	Launch the EC2 instance.
8.	Note the public IP address of the instance.
<img width="468" height="266" alt="image" src="https://github.com/user-attachments/assets/0b26b7f4-735a-4adc-bb37-7a1f18c706ea" />




 

Step 2: Connect to the EC2 Instance
connecting to EC2 instance using AWS connect:
windows:mobixterm
ssh -i <path-to-pem-file> ubuntu@<ec2-public-ip>
 <img width="468" height="264" alt="image" src="https://github.com/user-attachments/assets/cf8ab410-2342-4a8b-b5a2-ef325bdbe552" />


Step 3: Create MySQL Database Using AWS RDS
1.AWS Console → RDS → Create Database.
2 .Select MySQL as the database engine.
               3.In RDS service field names
database name: todoapp
username: admin
password:admin$123
endpoint to connect from RDS to Mysql:todoapp.ccn2ksey6i5w.us-east1.rds.amazonaws.com
<img width="468" height="375" alt="image" src="https://github.com/user-attachments/assets/c70c29bb-f029-4925-a723-a7c5d689c7e0" />


 

Step 4: Upload Backend JAR File to EC2:
1.	In new terminal window.
2.	Copy the backend JAR file to the EC2 instance using SCP.
                scp -i ~/Downloads/instance111.pem \todo-0.0.1-SNAPSHOT.jar \ubuntu@ec2-98-92-142-224.compute-1.amazonaws.com:/home/ubuntu/
               
Step 5: Run Backend Application on EC2:
1.	Log in to the EC2 instance via terminal: ssh -i /Users/ramyasreetadikonda/Downloads/instance111.pem ubuntu@98.92.142.224
2.	Navigate to the home directory: cd /home/ubuntu
3.	Start the backend application using the following command:
EC2 Instance Login via Terminal:
cd /home/ubuntu
java -jar todo-0.0.1-SNAPSHOT.jar \
--server.port=8085 \
--spring.datasource.url="jdbc:mysql://todoapp.ccn2ksey6i5w.us-east-1.rds.amazonaws.com:3307/todoapp?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC" \
--spring.datasource.username=admin \
--spring.datasource.password='admin$123' \
--spring.jpa.hibernate.ddl-auto=update \
--spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
step 6:
Deployed to EC2 :
Backend:
<img width="468" height="280" alt="image" src="https://github.com/user-attachments/assets/e02abbda-e68e-429d-acd0-46cea39ffe15" />


 

Postman logs:
 <img width="468" height="276" alt="image" src="https://github.com/user-attachments/assets/fc79da6e-c700-466b-8c8e-8669b8b2a606" />


Deployed to S3:
In frontend vscode terminal, run npm run build
dist file creates 
Pull the files in dist folder to S3 bucket 
enable static website hosting 
attach bucket policy (read/write)
Allow public access, application is available on internet
url: http://todoapp123678.s3-website-us-east-1.amazonaws.com/
<img width="468" height="266" alt="image" src="https://github.com/user-attachments/assets/c8bf46f9-e3b0-4e0d-b9e7-df4a7158a583" />

 
Ide: codespaces
Using terraform create EC2 instance:
Install terraform, aws and configure aws 
terraform init
terraform plan -tells about what we are creating in AWS 
terraform apply
 
AWS console:
 

<img width="540" height="611" alt="image" src="https://github.com/user-attachments/assets/1b988bea-fcf3-48a1-9e70-8c45ffa4e137" />
