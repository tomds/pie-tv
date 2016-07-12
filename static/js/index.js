import '../less/index.less';
import './ie10-viewport-bug-workaround.js';


class ChannelSelector {
    constructor() {
        this.bindEvents();
        this.selectedChannels = [];
        this.populateHiddenField();
    }

    bindEvents() {
        const checkboxes = document.getElementsByName('channels');
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('click', (e) => this.clickChannel(e));
        }
    }

    clickChannel(e) {
        this.toggleChannel(e);
        this.populateHiddenField();
    }

    toggleChannel(e) {
        const selectedChannelsList = document.getElementById('selected-channels');
        const channelName = e.currentTarget.value;

        if (e.currentTarget.checked) {
            // Check channel isn't already in list
            const selectedChannel = document.querySelectorAll(
                `#selected-channels [data-name="${channelName}"]`
            );

            if (!selectedChannel.length) {
                const li = document.createElement('li');

                li.setAttribute('data-name', channelName);
                li.innerText = channelName;
                selectedChannelsList.appendChild(li);
            }
        } else {
            const selectedChannel = document.querySelectorAll(
                `#selected-channels [data-name="${channelName}"]`
            )[0];

            if (selectedChannel) {
                selectedChannelsList.removeChild(selectedChannel);
            }
        }
    }

    populateHiddenField() {
        const checkboxes = document.querySelectorAll('[name="channels"]:checked');

        const channelNames = [];
        for (let i = 0; i < checkboxes.length; i++) {
            channelNames.push(checkboxes[i].value);
        }

        document.getElementsByName('selectedChannels')[0].value = JSON.stringify(channelNames);
    }
}

if (window.channels) {
    document.addEventListener('DOMContentLoaded', () => {
        new ChannelSelector();
    });
}
