FROM debian:11

# prepare the system and dependencies
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y yarnpkg git python3 pkg-config npm && \
    apt-get autoremove && \
    apt-get autoclean && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# add user
RUN useradd -m usr && echo "usr:usr" | chpasswd

# prepare the repo and build
RUN cd /home/usr && \
    runuser -u usr -- git clone https://github.com/Hedgehog-Computing/hedgehog-lab.git
RUN cd /home/usr/hedgehog-lab && runuser -u usr -- sh -c "git checkout dev && /usr/share/nodejs/yarn/bin/yarn install && /usr/share/nodejs/yarn/bin/yarn build"

# create the starter
RUN echo "#!/bin/sh" > /opt/run.sh && \
    echo "cd /home/usr/hedgehog-lab && /usr/share/nodejs/yarn/bin/yarn watch" >> /opt/run.sh && \
    chmod +x /opt/run.sh

ENTRYPOINT ["/bin/sh"]
CMD ["/opt/run.sh"]
USER usr

