module.exports = {
    promisify3: function (func) {
        return new Promise((resolve, reject) => {
            func(function (error, results, response=null) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results)
                }
            });
        })
    }
};