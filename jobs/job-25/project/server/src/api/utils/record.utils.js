/* eslint-disable no-param-reassign */

exports.organizeData = (data) => {
    let updatedData = [];
    if (data && data.length > 0) {
        updatedData = data.filter((f) => !f.isError).reduce((groups, item) => {
            const date = item.created_at;
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push({ source: item.source, rate: item.rate });
            return groups;
        }, {});
    }
    return updatedData;
};