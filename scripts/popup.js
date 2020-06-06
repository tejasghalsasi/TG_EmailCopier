
document
    .addEventListener('DOMContentLoaded', function () {

        document
            .getElementById('refrech-result')
            .addEventListener('click', refrech, false)
        document
            .getElementById('copy')
            .addEventListener('click', copy, false)
        

        refrech(false)
    }, false);