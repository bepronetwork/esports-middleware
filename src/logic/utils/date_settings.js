const fromPeriodicityToDates = ({periodicity='weekly'}) =>{
    var ret = {};

    switch(new String(periodicity).toLowerCase().trim()){
        case 'daily' : {
            ret = {
                from_date : getLastDaily(),
                to_date : new Date() // Today
            };
            break;
        };
        case 'weekly' : {
            ret = {
                from_date : getLastWeek(),
                to_date : new Date() // Today
            };
            break;
        };
        case 'monthly' : {
            ret = {
                from_date : getLastMonth(),
                to_date : new Date() // Today
            };
            break;
        };
        case 'all' : {
            ret = {};
            break;
        };
        default : {
            ret = {};
            break;
        }
    }

    return ret;
}

function getLastDaily() {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
}

function getLastWeek() {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
}

function getLastMonth() {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
}


export {
    fromPeriodicityToDates
}