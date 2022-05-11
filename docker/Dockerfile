FROM debian:11

# prepare the system and dependencies
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y yarnpkg git python3 pkg-config npm && \
    apt-get autoremove && \
    apt-get autoclean && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# prepare the repo and build
RUN cd /opt && \
    git clone https://github.com/Hedgehog-Computing/hedgehog-lab.git && \
    cd /opt/hedgehog-lab && \
    git checkout dev && \
    /usr/share/nodejs/yarn/bin/yarn install && \
    /usr/share/nodejs/yarn/bin/yarn build

# create the starter
RUN echo "#!/bin/sh" > /opt/run.sh && \
    echo "cd /opt/hedgehog-lab && /usr/share/nodejs/yarn/bin/yarn watch" >> /opt/run.sh && \
    chmod +x /opt/run.sh

ENTRYPOINT ["/bin/sh"]
CMD ["/opt/run.sh"]