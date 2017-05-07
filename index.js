var RBAC = {};

const fetchCSV = (url) => fetch(url)
    .then(v => v.text())
    .then(v => v.split('\n'))
    .then(v => v.slice(1)
        .filter(v => v)
        .map(v => v.split(',')
            .map(v => v.trim())
        )
    );

fetchCSV('UA.csv').then(v => { RBAC.UA = v; });
fetchCSV('PA.csv').then(v => { RBAC.PA = v; });

class RoleActiveEvent extends Event {
    constructor(role) {
        super('roleActive');
        this.role = role;
    }
}

function onRIDChange() {
    let roleId = document.getElementById('rid').value;
    let permissionIds = RBAC.PA.filter(v => v[0] === roleId).map(v => v[1]);
    window.dispatchEvent(new RoleActiveEvent({
        id: roleId,
        permissions: permissionIds
    }));
}

function onUIDChange(event) {
    let userId = event.target.value;
    let eRID = document.getElementById('rid');
    console.log('change');
    eRID.value = eRID.innerHTML = '';
    RBAC.UA.filter(v => v[0] === userId).forEach(v => {
        let child = document.createElement('option');
        child.value = child.innerHTML = v[1];
        document.getElementById('rid').appendChild(child);
    });
    onRIDChange();
}

document.getElementById('uid').oninput = onUIDChange;
document.getElementById('rid').oninput = onRIDChange;

// add listener
Array.from(document.getElementsByClassName('rbac')).forEach(function (el) {
    el.classList.add('hide');
    window.addEventListener('roleActive', function (event) {
        let pid = el.dataset.pid;
        if (event.role.permissions.includes(pid)) {
            el.classList.remove('hide');
        } else {
            el.classList.add('hide');
        }
    })
})
