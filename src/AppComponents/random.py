import boto3 
from botocore.exceptions import ClientError
from email.message import EmailMessage
import json
from datetime import date, datetime, timedelta
import time

s3Client = boto3.client("s3")
sesClient = boto3.client("ses", region_name='us-west-2')



def lambda_handler(event, context):
    response = s3Client.get_object(Bucket='vod-nbcu-ott-origin-east-stage',Key='pub/global/jerry/tracker/testing_gap_analysis_tracker.json')
    deprecated_key = f"pub/global/jerry/tracker/{(datetime.now())}_gap_analysis_tracker.json"
    file_content = response['Body'].read().decode('utf-8')
    put_file_content = response['Body'].read()
    json_file =json.loads(file_content)
    number_of_channels = 0
    channel_sentence = "Checked gaps in the following channels: \n"
    channel_dict = {}
    for channel in json_file["channels"]:
        number_of_channels = number_of_channels + 1
        channel_dict[channel] = 0
    for error in json_file["errors"]:
        channel_dict[error["stream"]] = channel_dict[error["stream"]]+1
    for channel in json_file["channels"]:
        channel_sentence = channel_sentence + "\n" +channel +" "+ str(channel_dict[channel]) + " gaps found"
    if len(json_file["errors"]) > 0:
        # content = f" \n \n We've found {len(json_file["errors"])} gaps in our latest scan. \n \n You can find all logged events here: \n \n https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#logsV2:log-groups/log-group/$252Faws$252Flambda$252FgapAnalysisCloudWatch \n \n Best, \n PeacockDevTeam"
        content = f"{channel_sentence}. \n \nYou can find all logged events here: \n \n https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#logsV2:log-groups/log-group/$252Faws$252Flambda$252FgapAnalysisCloudWatch \n \nBest, \nPeacockDevTeam"
    else:
        content = f"{channel_sentence} \n \nYou can find all logged events here: \n \nhttps://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#logsV2:log-groups/log-group/$252Faws$252Flambda$252FgapAnalysisCloudWatch \n \nBest, \nPeacockDevTeam"
    msg = EmailMessage()
    msg["Subject"] = f"Gap Analysis Check {date.today()}"
    msg["From"] = "peacockdevteam@nbcuni.com"
    msg['To'] = ['jerry.pallath@nbcuni.com','Naman.Diwaker@nbcuni.com','david.mclary@nbcuni.com','Karen.Hope-Murray@nbcuni.com']
    msg.set_content(
        content
    )
    sesClient.send_raw_email(Source="vodassetvalidation@nbcuni.com",Destinations=['jerry.pallath@nbcuni.com','Naman.Diwaker@nbcuni.com','david.mclary@nbcuni.com','Karen.Hope-Murray@nbcuni.com'], RawMessage={'Data': msg.as_string()})
    # sesClient.send_raw_email(Source="vodassetvalidation@nbcuni.com",Destinations=['jerry.pallath@nbcuni.com'], RawMessage={'Data': msg.as_string()})
    s3Client.put_object(Body=json.dumps(json_file),ContentType='charset=utf-8', Bucket='vod-nbcu-ott-origin-east-stage',Key=deprecated_key)
    s3Client.put_object(Body=b'{"channels":[],"errors":[],"passed":[]}', Bucket='vod-nbcu-ott-origin-east-stage',Key='pub/global/jerry/tracker/gap_analysis_tracker.json')