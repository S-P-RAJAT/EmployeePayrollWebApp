const convertDate = (date) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric'};
    const newDate = !date ? "undefined" :
                    new Date(Date.parse(date)).toLocaleDateString('en-GB',options);
    return newDate;
}

const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(!nameRegex.test(name))
        throw 'Name is incorrect';
}

const checkStartDate = (startDate) => {
    let now = new Date();
        if(startDate<=now)
        {
            var diff = Math.abs(now.getTime() - startDate.getTime());
            if(diff/(1000*60*60*24) > 30)
            throw 'Start Date is beyond 30 Days';
        }
        else
        throw 'Start Date is a Future Date';
}