# IP Watch
Detect IP changes and if the current IP is on a blacklist.

## Clone the repo
```
git clone https://github.com/stevenharradine/ip-watch.git
```

## Install node packages
```
npm install
```

## Set up config.js
| Option  | Description |
| ------------- | ------------- |
| DNS_SERVER  | Who is returning your external ip  |
| EMAIL_PROVIDER  | Who is sending your emails (provided by email provider)  |
| EMAIL_USER  | The user sending emails (provided by email provider)  |
| EMAIL_PASSWORD  | The user email password (provided by email provider)  |
| NOTIFY_EMAIL  | Who is getting notified when the alarm is triggered  |
| IP_BLACKLIST  | List of IPs to notifiy if they are ever assigned  |

## Run
```
node ip-watch
```
