window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const nameTextError = document.querySelector('.name-text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            setErrorText(".name-text-error", "");
            return;
        }
        try {
            (new EmployeePayRollData()).name = name.value;
            setErrorText(".name-text-error", "");
        } catch (e) {
            setErrorText(".name-text-error", e);
        }
    });
    const startDate = document.querySelector('.start-date');
    startDate.addEventListener('input', function () {
        let year = getInputValueById('#year');
        let month = getInputValueById('#month');
        let day = getInputValueById('#day');
        if (day == "" || month == "" || year == "") {
            setErrorText(".date-text-error", "");
            return;
        }

        try {
            (new EmployeePayRollData()).startDate = new Date(year, parseInt(month) - 1, day);
            setErrorText(".date-text-error", "");
        } catch (e) {
            setErrorText(".date-text-error", e);
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

});

const setErrorText = (errorName, errorMessage) => {
    const textError = document.querySelector(errorName);
    textError.textContent = errorMessage;
    return;
}

const save = () => {
    let employeePayrollData;
    try {
        employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayRollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setErrorText(".name-text-error", " Please write valid name");
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let year = getInputValueById('#year');
    let month = parseInt(getInputValueById('#month')) - 1;
    let day = getInputValueById('#day');
    try {
        employeePayrollData.startDate = (new Date(year, month, day));
    } catch (e) {
        setErrorText(".date-text-error", "Please provide correct date");
        throw e;
    }
    console.log(employeePayrollData.toString());

    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selectedItems.push(item.value);
    });
    return selectedItems;
}

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    }
    else {
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
    setErrorText(".name-text-error", "");
    setErrorText(".date-text-error", "");
    setTextValue('.salary-output',"400000");
  }
  
  const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
      item.checked = false;
    });
  }
  
  const setTextValue = (query, value) =>{
    const element = document.querySelector(query);
    element.textContent = value;
  }
  
  const setValue = (query, value) => {
    const element = document.querySelector(query);
    element.value = value;
  }