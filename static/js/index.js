import '../less/index.less';
import './ie10-viewport-bug-workaround.js';


class ChannelSelector {
    constructor() {
        this.bindEvents();
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

    /**
     * When a channel checkbox is clicked, add or remove it from the list of
     * selected channels as appropriate.
     */
    toggleChannel(e) {
        const selectedChannelsList = document.getElementById('selected-channels');
        const channelName = e.currentTarget.value;

        // If we just selected this channel...
        if (e.currentTarget.checked) {
            const selectedChannel = document.querySelectorAll(
                `#selected-channels [data-name="${channelName}"]`
            );

            // Check channel isn't already in list
            if (!selectedChannel.length) {
                // Make a <li> representing the channel and add it to the list
                const li = document.createElement('li');

                li.setAttribute('data-name', channelName);
                li.innerText = channelName;
                selectedChannelsList.appendChild(li);
            }
        } else { // If we just deselected this channel...
            // Check the channel definitely appears in the list
            const selectedChannel = document.querySelectorAll(
                `#selected-channels [data-name="${channelName}"]`
            )[0];

            if (selectedChannel) {
                // Delete from the list
                selectedChannelsList.removeChild(selectedChannel);
            }
        }
    }

    /*
     * Populate a hidden form field which keeps a JSON representation of the
     * current state of which channels are selected. This will be submitted to
     * the server when we cilck the Checkout button.
     */
    populateHiddenField() {
        // Find the channels that are selected i.e. checked checkboxes
        const checkboxes = document.querySelectorAll('[name="channels"]:checked');

        // Generate an array of names of selected channels
        const channelNames = [];
        for (let i = 0; i < checkboxes.length; i++) {
            channelNames.push(checkboxes[i].value);
        }

        // JSONify and set as value of hidden field
        document.getElementsByName('selectedChannels')[0].value = JSON.stringify(channelNames);
    }
}

if (window.channels) {
    document.addEventListener('DOMContentLoaded', () => {
        new ChannelSelector();
    });
}
