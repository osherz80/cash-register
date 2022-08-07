let adminMenuesStack = [];

const adminEntranceToggle = () => {
    adminLightBox.classList.toggle("hide", false);
    adminLoginBlock.classList.toggle("hide", false);
    secondaryContainer.classList.toggle("hide", false);
    allContainer.classList.toggle("hide", true);
    let loggedIn = sessionStorage.getItem('isLoggedIn');
    if (loggedIn) {
        adminLoginBlock.classList.toggle("hide", true);
        adminMenue.classList.toggle("hide", false);
    }
}

const toggleManageAdmins = () => {
    adminsManageBlock.classList.toggle("hide", false);
    adminMenue.classList.toggle("hide", true);
    adminMenuesStack.push(event.target.parentElement.id);
}

const toggleManageMenues = () => {
    menuesManageBlock.classList.toggle("hide", false);
    adminMenue.classList.toggle("hide", true);
    adminMenuesStack.push(event.target.parentElement.id);
}

const toggleAddMenue = () => {
    addMenueBlock.classList.toggle('hide', false);
    menuesManageBlock.classList.toggle('hide', true);
    adminMenuesStack.push(event.target.parentElement.parentElement.id);
}

const toggleAddItem = () => {
    addItemBlock.classList.toggle('hide', false);
    menuesManageBlock.classList.toggle('hide', true);
    adminMenuesStack.push(event.target.parentElement.parentElement.id);
}

const toggleDeleteItem = () => {
    deleteItemBlock.classList.toggle('hide', false);
    menuesManageBlock.classList.toggle('hide', true);
    adminMenuesStack.push(event.target.parentElement.parentElement.id);

}

const toggleDeleteMenue = () => {
    deleteMenueBlock.classList.toggle('hide', false);
    menuesManageBlock.classList.toggle('hide', true);
    adminMenuesStack.push(event.target.parentElement.parentElement.id);

}

const toggleAddExtraBlock = () => {
    addExtraBlock.classList.toggle('hide', false);
    menuesManageBlock.classList.toggle('hide', true);
    adminMenuesStack.push(event.target.parentElement.parentElement.id);
}

const toggleDeleExtraBlock = () => {
    deleteExtraBlock.classList.toggle('hide', false);
    menuesManageBlock.classList.toggle('hide', true);
    adminMenuesStack.push(event.target.parentElement.parentElement.id);
}

const toggleAddAdmin = () => {
    document.getElementById('manage_admins_block').classList.toggle('hide', true);
    document.getElementById('add_admin_block').classList.toggle('hide', false);
    adminMenuesStack.push(event.target.parentElement.id);
}

const toggleDeleteAdmin = () => {
    document.getElementById('manage_admins_block').classList.toggle('hide', true);
    document.getElementById('delete_admin_block').classList.toggle('hide', false);
    adminMenuesStack.push(event.target.parentElement.id);
}

const toggleGetRecords = () => {
    document.querySelector('.get_records_block').classList.toggle("hide", false);
    adminMenue.classList.toggle("hide", true);
    adminMenuesStack.push(event.target.parentElement.id);
}

const adminESC = () => {
    event.target.parentElement.parentElement.classList.toggle('hide', true);
    document.getElementById(adminMenuesStack.pop()).classList.toggle('hide', false);
}

const goBackBack = () => {
    let adminMenuesContainer = document.querySelector('.admin_menues_section');
    for (let i = 0; i < adminMenuesContainer.children.length; i++) {
        let child = adminMenuesContainer.children[i];
        child.classList.toggle('hide', true);
    }
    adminLightBox.classList.toggle("hide", true);
    allContainer.classList.toggle("hide", false);
}