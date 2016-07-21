/* eslint no-param-reassign: 0 */

import angular from 'angular';
import '../less/index.less';
import './ie10-viewport-bug-workaround.js';


angular.module('channelSelector', [])
.controller('channelList', ['$scope', ($scope) => {
    $scope.selectedChannels = [];

    /*
     * Return a filtered list of channels according to the category argument.
     */
    $scope.filterChannels = (category) => (
        window.channels.filter((channel) => (
            channel.category === category
        ))
    );

    /*
     * Add to/remove from selected channels list when a channel is clicked.
     */
    $scope.toggleChannel = (e) => {
        const channelName = e.currentTarget.value;
        const checked = e.currentTarget.checked;

        const listIndex = $scope.selectedChannels.indexOf(channelName);

        if (checked && listIndex === -1) { // Add to list
            $scope.selectedChannels.push(channelName);
        } else if (!checked && listIndex !== -1) { // Remove from list
            $scope.selectedChannels.splice(listIndex, 1);
        }
    };

    /*
     * Convert current list of channels to JSON string to pass to hidden field
     */
    $scope.stringifyChannels = () => (
        JSON.stringify($scope.selectedChannels)
    );
}]);
