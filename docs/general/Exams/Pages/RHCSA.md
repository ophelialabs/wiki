> **Note:** When setting up an OCI account for the first time, create an Oracle <a href="https://profile.oracle.com/myprofile/account/create-account.jspx" target="_blank" rel="noopener noreferrer">Personal</a> and <a href="https://www.oracle.com/cloud/" target="_blank" rel="noopener noreferrer">Cloud</a> account. Then visit <a href="https://www.oracle.com/support/" target="_blank" rel="noopener noreferrer">Support</a> for MOS (i.e. - <a href="https://cloudservices.oracle.com/pulse" target="_blank" rel="noopener noreferrer">Pulse</a>, <a href="https://blogs.oracle.com/exadata/post/exadata-mos-notes" target="_blank" rel="noopener noreferrer">Exadata</a>) to finish account setup.


## RHCSA Exam Practice
- <a href="https://docs.oracle.com/en/operating-systems/oracle-linux/9/" target="_blank" rel="noopener noreferrer">Linux Docs</a>
- Credit to <a href="https://www.youtube.com/@harunaadoga" target="_blank" rel="noopener noreferrer">Haruna Adoga</a>

## Section1: Understand & Use Essential Linux Tools
## Task 1: Text search and Archive - man pages
- 1.1 Find the string "listen" in /etc/httpd/conf/httpd.conf and save the output to /root/web.Text
````markdown
$ grep listen /etc/httpd/conf/httpd.conf >> /root/web.txt
$ ls -a /root/web.txt
$ cat /root/web.txt
````

- 1.2 Create a gzip-compressed tar archive of/
    etc named etc_vault.tar.gz in /vaults dir.
        - use man pages for gzip option
```bash
$ mkdir ~./vaults
$ man tar
$ tar cvfz ~./vaults/etc_vault.tar.gz /etc
$ ls -a ~./vaults/etc_vault.tar.gz
```

## Task 2: File Links - Shortcuts
- 2.1 In /shorts dir.:
    - Create a file file_a
```bash
$ mkdir /shorts && cd /shorts
$ touch file_a
$ man ln
```
- 2.2 Create soft link file_b pointing to file_a
```bash 
$ ln -s file_a file_b
```
- 2.3 Create hard link file_c pointing to file_a
```bash
$ ln file_a file_c
```
- 2.4 Verify
```bash
$ ls -al
$ echo "file testing" >> file_a
$ cat file_b
$ cat file_c
```

## Task 3: Advanced File Operations - Find
- 3.1 Find file in ~/usr that are greater than 3MB but < 10MB and copy them to /bigfiles dir.
```bash 
$ man find
$ mkdir /bigfiles
$ # find ~/usr -type f -size +3M -size -10M -exec cp {} /bigfiles \;
$ ls /bigfiles
```
- 3.2 Find files in /etc modified > 120 days ago and copy them to /var/tmp/twenty/
```bash
$ mkdir /var/tmp/twenty/
$ find /etc -type f -mtime +120 exec cp {} /var/tmp/twenty \;
$ ls /var/tmp/twenty
```

- 3.3 Find all files owned by user hadoga and copy them to /root/h-files 
```bash
$ mkdir /root/h-files
$ find /* -type f -user "username" -exec cp {} /root/h-files \;
$ ls /root/h-files/
```
- 3.4 Find a file named "httpd.conf" and save the absolute paths to /root/httpd-paths.txt
```bash
$ find / -type f -name httpd.conf >> /root/httpd-paths.txt
$ cat /root/httpd-paths.txt
```

## Task 4: Remote Access and File Permissions
- 4.1 From node1, SSH into node2 as user hadoga and:
    - Copy the contents of /etc/fstab to /var/tmp
```bash
$ ssh -p 22 "username"@ipaddress(ifconfig)
$ cp /etc/fstab /var/tmp
$ ls /var/tmp
```
- 4.2 Set the file ownership to root
```bash
$ ls -al /var/tmp/fstab
$ chown root: /var/tmp/fstab
$ chmod -x /var/tmp/fstab
```
- 4.3 Ensure no execute permissions for anyone
```bash
$ ls -al /var/tmp/fstab
```

## Section2 Create Simple Shell Scripts
## Task 1: Size-Based File Search
- 1.1 Create a shell script that:
Finds files in /usr sized >30KB but <50KB
```bash
$ cat << sudo tee | find-files(script1).sh
#!/bin/bash
# Script to find files
find /usr -type f -size +30KB -size -50KB > /root/sized_files.txt
EOF>>
```
- 1.2 Outputs results to /root/sized_files.txt
```bash
$ chmod +x find-files(script1).sh
$ ./find-files.sh
$ cat find-files.sh
$ cat root/sized_files.txt
```

## Task 2: Conditional Script (career.sh) with arg
- 2.1 Create /root/career.sh that:
    - Outputs "Yes, I'm a Systems Engineer." when run with ./career.sh me
    - Outputs "Okay, they do cloud engineering." when run with ./career.sh they
    - Outputs "Usage: ./career.sh me|they" for invalid/empty args
```bash
$ sudo nano /career.sh
```
```bash
#!/bin/bash
#Author:
#Script to check career

if ["$1" == "me"] 
then 
    echo "Yes, I'm a Systems Engineer.";
elif ["$1" == "they"]
then
    echo "Okay, they do cloud engineering.";
elif [ -z "$1"]
    echo "Please provide an argument: me|they"
else
    echo "Usage: ./career.sh me|they"
fi
```
```bash
$ ls -al career.sh
$ chmod +x career.sh
$ ./career.sh
```

## Task 3: File Processing, Input/Output Users and Groups Script
- 3.1 Write shell scripts on node1 that create users and groups according to the following params.:
    - maryam:2030:hpc_admin,hpc_managers
    - adam:2040:sysadmin,
    - jacob:2050:hpc_admin

```bash
$ nano groups.txt
```
```bash
$ hpc_admin:7070
$ hpc_managers:8080
$ sysadmin:9090
```
```bash
$ nano create_groups.sh
#!/bin/bash
while IFS=":" read group gid;
do
    echo "Creating group $group with GID $gid";
    groupadd -g $group $gid;
done < groups.txt
```
```bash
$ chmod +x create_groups.sh
```
```bash
$ ./create_groups.sh
```
```bash
$ nano users.txt
        maryam:2030:hpc_admin,hpc_managers
        adam:2040:sysadmin,
        jacob:2050:hpc_admin
```
```bash
$ nano create_users.sh
#!/bin/bash

while IFS=":" read user uid groups;
do 
    echo "Creating user $user with UID $uid belonging to groups $groups"
    useradd -G $groups -u $uid $user
```
```bash
$ chmod +x create_users.sh
$ ./create_users.sh
```

- 3.2 Write a shell script that sets the passwords of the users maryam, adam and jacob to Password@1
```bash
$ nano setpass.sh
#!/bin/bash
for user in maryam adam jacob; 
do
    echo Password@1 | passwd --stdin $user;
done
```
```bash
$ chmod +x setpass.sh
$ ./setpass.sh
```

## Section3 Operate Running Systems
## Task 1: Reset Root Password
---
- Break into node2 and set a new root password to hoppy
- At kernel version bootloader press 'E'
- At end of linux ($root) add swap rd.break and press Ctrl-x or F10
```bash
mount -o remount,rw /sysroot
chroot /sysroot
passwd
# Enter new password
touch /.autorelabel
exit
```

## Task 2: Tuning Profile Configuration and SELINUX
---
- Check the current recommended tuning profile
```bash
systemctl status tuned
sudo dnf install duned -y
sudo systemctl enable --now tuned
systemctl status tuned
tuned-adm recommend
sudo tuned-adm profile virtual-guest
tuded-adm active
```
- Put SELinux in permissive mode on node2
```bash
getenforce
sudo setenforce 0
sudo vim /etc/selinux/config
# Set SELINUX=permissive
getenforce
sudo reboot
```
- On node1 ensure network service is enabled and starts on boot
```bash
systemctl status NetworkManager
sudo systemctl enable --now NetworkManager
systemctl status NetworkManager
```
## Task 4: Persistant Journaling
---
- Configure persistant journaling on both servers to retain logs and reboots
```bash
su
cat /var/log/messages
mkdir /var/log/journal
ls /var/log/journal/
journalctl --flush
ls /var/log/journal/
```

## Task 5: Process process scheduling
---
- Start a stress-ng process on node1 with a niceness value of 19
- Adjust the niceness value of the running stress-ng process to 10
- Terminate the stress-ng process
```bash
top
dnf list installed | grep stress-ng
dnf install stress-ng -y
dnf list installed | grep stress-ng
nice -n 19 stress-ng -c 1 &
top
# 'r' to adjust niceness value of stress-ng pid
# 'k'to terminate pid process
9
q
```bash

## Task 6: File Permissions & File ACLs
---
- Copy /etc/fstab to /var/tmp
- Set the file owner to root
chown root: /var/tmp/fstab
chmod -x /var/tmp/fstab
- Ensure /var/tmp/fstab is not executable by anyone
- Configure file ACLs on the copied file to"
    - User adam: read & write
    - User maryam: no access
    - All other users: read-only
```bash
getfacl /var/tmp/fstab
ls -al /var/tmp/fstab
setfacl -m u:adam:rw- /var/tmp/fstab
setfacl -m u:maryam:--- /var/tmp/fstab
setfacl -m o::r-- /var/tmp/fstab
getfacl /var/tmp/fstab
```
## Task 7: Secure File Transfer
- On node1, create a file node1-file.ext and securely copy (scp) to home dir of user on node2
```bash
touch node1-file.txt
# get IP of node2 using ifconfig
scp -v node1-file.txt user@IP:home/usr/
```

## Section4: How to Configure Local Linux Storage
- Task 1: Set Up LVM on node1
    * Create a logical volume named devops_lv with 32 extents using the /dev/vdb disk
        * This should be created from a volume group named devops_vg with 20mb physical extents. Format the logical volume as an ext4 filesystem and mount it persistently at /mnt/devops_lv
```bash
lsblk
echo $(( 32 * 20 ))
fdisk /dev/vdb
m
p
lsblk
pvcreate dev/vdb1
man pvcreate
vgcreate -s 20M devops_vg /dev/vb1
vgdisplay devops_vg
lvcreate -n devops_lv -l 32 devops_vg
lvs
mkfs.ext4 /dev/devops_vg/devops_lv
mkdir /mnt/devops_lv
vim /etc/fstab
# Shift + $
/dev/devops_vg/devops_lv /mnt/devops_lv 
ext4
defaults
0 0 
mount -a
df -h
```
- Task 2: Create and Mount Swap volume persistently
    * From /dev/vdb, create a 800mb swap partition and configure it to mount persistently. All changes must persist after reboot
```bash
lsblk
fdisk /dev/vdb
m
p
free -h
mkswap /dev/vdb2
cat /etc/fstab
lsblk
vim /etc/fstab
/dev/vdb2 swap swap defaults 00
mount -a
swapon -a
swapon /dev/vdb2
free -h
lsblk
```
## Section5: Create and Configure File Systems
- Task 1: Resize devlops_lv and Configure Swap volume
    * On node1, resize the existing cloud_lv logical volume to 250MB (a size between 225-270MB is acceptable), while resizing its filesystem accordingly.
```bash
lvs
man lvextend
lvextend -L +50 /dev/cloud_vg/cloud_lv -r
lvs
```
- Task 2: Configure Autofs for remote user home directories
    * Create a user named bobby with UID of 4000, with no home directory, and a base directory of /mnt/netdir and a password of hoppy
    * Configure NFS autofs such that the home directory of user bob is automatically mounted at /mnt/netdir/bobby on login. Note that bobby's account has been configured on the NFS server exporting their home directory at repo.rhcsa.home:/home/bobb Login as bobby to verify your config
```bash
useradd -u 4000 -M -b /mnt/netdir bobby
id bobby
passwd bobby
# note directions "hoppy"
systemctl status autofs
sudo dnf install autofs nfs-utils
systemctl status aufofs
systemctl enable --now autofs
systemctl status autofs
ping repo.rhcsa.home
mkdir /mnt/netdir
cd /etc/auto.master.d/
ls
vim rhcsa.home
-rw repo.rhcsa.home:/home/&
ls
cat rhcsa.home
vim /etc/auto.master
+auto.master
/mnt/netdir /etc/auto.master.d/rhcsa.home
systemctl restart autofs
systemctl status
# Verify
su - bobby 
```
## Section6: Deploy, Configure and Maintain Linux
- Task 1: Cron Job Configuration
    * Create a cron job for user that runs logger "RHCSA Playlist Now Available" every 2 minutes. Use at to write "This task was easy!" to /at-files/at.txt in 2 minutes.
```bash
systemctl --now enable crond
cat /etc/crontab
crontab -e -u $user
*/2**** logger "RHCSA Playlist Now Available"
journalctl -f | grep RHCSA
grep RHCSA /var/log/messages
systemctl status at.d
dnf install at -y
systemctl enable --bow at.d
systemctl status at.d
mkdir /at-files
echo "This task was easy!" >> /at-files/at.txt | at now + 2 minutes
man at
atq
ls /at-files/
cd /at-files/
cat at.txt
```

- Task 2: Local YUM Repository Configuration
    * Configure BaseOS (URL: http://repo.rhcsa.home/repo/BaseOS/) and AppStream (URL: http://repo.rhcsa.home/repo/AppStream/) repos on node1
```bash
dnf install git -y
cd /etc/yum.repos.d/
ls
vim rchsa.repo
[BaseOS]
name-BaseOS RHCSA
baseurl=http://repo.rhcsa.home/repo/BaseOS/
enabled=1
gpgcheck=0

[AppStream]
name=AppStream RHCSA
baseurl=http://repo.rhcsa.home/repo/AppStream
enabled=1
gpgcheck=0
dnf repolist
#Check work
pwd
ls
cat rhcsa.repo
```

- Task 3: NTP Chrony Configuration
    * Set up chrony time service to sync time with server.rhel.com
```bash
systemctl status chronyd
systemctl enable --now chronyd
vim /etc/chrony.conf
# RHCSA server
pool server.rhel.com iburst
systemctl restart chronyd
chronyc sources
```

- Task 4: GRUB Bootloader Modification
    * Set GRUB_TIMEOUT=10,
    * GRUB_TIMEOUT_STYLE=hidden, and add quiet to GRUB_CMDLINE_LINUX.
    * Apply your changes to the grub config file.
```bash
vim /etc/default/grub
GRUB_TIMEOUT_STYLE=hidden
# add quiet to end of cmd line
grub2-mkconfig -o /boot/grub2/grub.cfg
```
## Section7: How to Configure Networking on Linux
- Task 1: Enable Network Services
    * Ensure network services starts at boot
```bash
systemctl enable --now NetworkManager
systemctl status NetworkManager
```

- Task 2: Firewall Rules
    * Allow access SSH and HTTP services using firewall-cmd
```bash
firewall-cmd --list-all
firewall-cmd --add-service rpc-bind --permanent
firewall-cmd --reload
firewall-cmd --list-all
```
- Task 3: Static IP Configuration
    * Assign IP 172.16.1.10/24, gateway 172.16.1.1, DNS 172.16.1.1
    * hostname node5.rhcsa
    * Set DNS search domain to rhel.server.com
```bash
ifconfig
nmcli
nmcli con show
nmtui
# edit connection
# IPV4 config
# edit address config
# edit hostname
# Activate a connection, deactivate
nmtui # reactivate
ifconfig
```

## Section8: How to Manage Users and Groups 
- Task 1: User/Group Creation
    * Create a group named sharegroup and the following users
        * $User (with no login shell, not a member of sharegroup)
        * Umar (member of sharegrp)
        * Adoga (with UUID 4444 member of sharegrp)
        * All users should have a passwd persward
        * Change the passwd of user $User to perfect
```bash
groupadd sharegroup
getent group sharegroup
useradd -s /sbin/nologin haruna
id haruna
useradd -G sharegroup umar
id umar
useradd -a 4444 -G sharegroup adoga
id adoga
for user in haruna umar adoga; do echo 'persward' | passwd --stdin $user; done
passwd adoga
```

- Task 2: User Password Policies
    * Enforce password policy to have a minimum length of 8 chars
    * Set the max password age to 30 days
```bash
vim /etc/security/pwquality.conf
vim /etc/login.defs
```

- Task 3: Delete Users and Groups
    * Remove the user Umar from sharegrp
    * Delete the sharegrp
    * Delete the user $User with their home directory
```bash
man gpasswd
gpasswd -d umar sharegroup
getent group sharegroup
groupdel sharegroup
getent group sharegroup
ls /home/
man userdel
userdel -r haruna
```

## Section9: Manage Linux Security
- Task 1: Configure Key-based Authentication as root & Allow SSH Root Access
    * Generate SSH key on node1, and setup key-based authentication for the root user
    * Enable SSH root login and test your configuration
    * ssh -p 22 user@ip (ol9 - ol9) will ask for login and share fingerprint
    * Not neccessary but can Cockpit be utilized during test?
```bash
ssh-keygen
cd .ssh
ls
vim /etc/ssh/sshd_config
systemctl restart sshd
ssh-copy-id -i ~/.ssh/id_rsa.pub root@ip
ssh root@ip
```

- Task 2: HTTPD Server Troubleshooting SELinux
    * The web server on node1 (192.168.70.10) is listening on port 85, ensure that the website is reachable via that port
    * Fix SELinux context for /var/wwwhtml, if needed
    * Tet using curl http://server-ip/ or use a web browser
```bash
systemctl start httpd
vim /etc/dttpd/conf/httpd.conf
semanage port -l | grep http
man semanage port
semanage port -a -t http_port_t -p tcp 85
semange port -l | grep http
firewall-cmd --list-all
firewall-cmd --add-port 45/tcp --permanent
firewall-cmd --add-service http --permanent
firewall-cmd reload
firewall-cmd --list-all
systemctl restart httpd
systemctl enable --now httpd
systemctl status httpd
curl http://server-ip/
```

## Section10: Manage Containers
- Task 1: Container Image Creation
    * As user haruna on node2, build a container image named web_image using the container file located at http://repo.rhcsa.hom/containers/Containerfile
```bash
loginctl enable-linger $user
podman image list
podman ps -a
podman image build -t web_image -f http://repo.rhcsa.home/containers/Containerfile
podman login registry.access.redhat.com

- Task 2: Systemd Rootless Container Service
    * Deploy haruna_web container with the the following:
        * Map host port 8000 > container port 80
        * Map the host directory /opt/user_files to container directory /opt/userfiles. Files should be accessible
        * Configure the container as a systemd service to start on boot
```bash
podman run -dit --name haruna_web -p 8000:80 -v /opt/user_files:/opt/userfiles:z web_image
podman ps
podman exec -it haruna_web /bin/bash
cd /opt/userfiles/
pwd
ls
echo "RHCSA" >> rhcsa.txt
ls
exit
cd /opt/user_files/
ls 
cat rhcsa.txt
cd ~/
ls
podman ps
podman generate systemd --new --files --name haruna_web # generates in current working directory
mkdir -p ~/.config/systemd/user
mv container-haruna_web.service ~/.config/systemd/user/
cd ~/.config/systemd/user
ls
podman ps
podman stop haruna_web
podman ps -a
podman rm haruna_web
systemctl --user daemon-reload
loginctl enable-linger
systemctl --user enable --now container-haruna_web.service
systemctl --user status container-haruna_web.service
podman ps -a
```