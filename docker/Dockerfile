FROM debian:11

RUN useradd -m usr && echo "usr:usr" | chpasswd && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y yarnpkg git python3 pkg-config npm && \
    apt-get autoremove && \
    apt-get autoclean && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    cd /opt && \
    git clone https://github.com/Hedgehog-Computing/hedgehog-lab.git && \
    cd /opt/hedgehog-lab && \
    git checkout dev && \
    /usr/share/nodejs/yarn/bin/yarn install && \
    /usr/share/nodejs/yarn/bin/yarn build && \
    echo "cd /opt/hedgehog-lab && /usr/share/nodejs/yarn/bin/yarn watch" > /opt/run.sh