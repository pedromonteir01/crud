class Team {
    constructor(name, qnt) {
        this.id = this.id();
        this.name = name;
        this.qnt = qnt;
        this.reservs = this.calcReservas();
        this.total = this.calcTotal();
    }

    id() {
        return Math.floor(Math.random() * 1000);
    }

    calcReservas() {
        return Math.floor(this.qnt / 2);
    }

    calcTotal() {
        return this.qnt + this.reservs;
    }
}

class TeamService {
    constructor() {
        this.teams = [];
    }

    addTeam(team) {
        this.teams.push(team);
    }

    listTeams() {
        return this.teams
    }

    listTeamsById(param) {
        return this.teams.find(team => team.id == param);
    }

    updateTeam(id, name, holders) {
        const team = this.listTeamsById(id);

        team.name = name;
        team.qnt = holders;
        team.reservs = team.calcReservas();
        team.total = team.calcTotal();

        return team;
    }

    deletTeam(param) {
        return this.teams = this.teams.filter((team) => team.id != param);
    }
}

const teamService = new TeamService();

function catchValues() {
    let name = document.getElementById('team-name').value;
    let qnt = Number(document.getElementById('qnt').value);

    const team = new Team(name, qnt);
    teamService.addTeam(team);

    listTeams();
    clearFields();
}

function listTeams() {
    const teams = teamService.listTeams();

    const listElement = document.getElementById('list-teams');
    listElement.innerHTML = '';

    let content = '';

    teams.forEach(team => {
        content += `
        <div onclick="listarEquipesPorId(${team.id})">
            <p>Nome: ${team.name}</p>
        </div>
        `
    });

    listElement.innerHTML = content;
}

function listarEquipesPorId(id) {
    const team = teamService.listTeamsById(id);

    document.getElementById('list-oneteam').classList.remove('hidden');

    const listElement = document.getElementById('list-oneteam');
    listElement.innerHTML = '';

    let content = `
        <div>
            <p>Id: ${team.id}</p>
            <p>Name: ${team.name}</p>
            <p>Holders: ${team.qnt}</p>
            <p>Reservs: ${team.reservs}</p>
            <button onclick="updateTeam(${team.id})">Editar</button>
            <button onclick="deletarEquipe(${team.id})">Excluir</button>
        </div>
    `;

    listElement.innerHTML = content;
}

let aux = null;

function updateTeam(id) {
    const team = teamService.listTeamsById(id);

    document.getElementById('team-name').value = team.name;
    document.getElementById('qnt').value = team.qnt;

    document.getElementById('btn-register').classList.add('hidden');
    document.getElementById('btn-edit').classList.remove('hidden');

    aux = id;
}

function editTeam() {
    const name = document.getElementById('team-name').value;
    const qnt = document.getElementById('qnt').value;

    teamService.updateTeam(aux, name, qnt);

    listTeams();

    document.getElementById('btn-register').classList.remove('hidden');
    document.getElementById('btn-edit').classList.add('hidden');

    document.getElementById('list-oneteam').classList.add('hidden');

    aux = null;
    clearFields();

}

function deletarEquipe(id) {
    teamService.deletTeam(id);

    listTeams();

    document.getElementById('list-oneteam').classList.add('hidden');
}

function clearFields() {
    document.getElementById('team-name').value = '';
    document.getElementById('qnt').value = '';
}
