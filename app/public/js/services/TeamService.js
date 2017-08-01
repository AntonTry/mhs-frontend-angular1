class TeamService {
    constructor(connection) {
        this.connection = connection;
        this.teamRef = connection.ref().child('teams');
    }

    save(team) {
        return this.teamRef
            .push(team)
            .then(
                (res) => {
                    return res;
                },
                (err) => {
                    console.log(err);
                    return err;
                });
    };

    updateTeamById(teamId, team) {
        return this.teamRef
            .child(teamId)
            .set(team)
            .then(
                () => {
                    return {key: teamId};
                },
                (err) => {
                    console.log(err);
                    return err;
                });
    };

    getById(id) {
        return this.teamRef
            .child(id)
            .once('value')
            .then(
                (res) => {
                    return res.val();
                },
                (err) => {
                    console.log(err);
                    return err;
                });
    };

    getAllTeams() {
        return this.teamRef
            .once('value')
            .then(
                (res) => {
                    return res.val();
                },
                (err) => {
                    console.log(err);
                    return err;
                });
    };

    getByGame(gameId) {
        return this.connection
            .ref()
            .child('games')
            .child(gameId)
            .child('teams')
            .once('value')
            .then(
                (res) => {
                    return res.val();
                },
                (err) => {
                    console.log(err);
                    return err;
                });
    };
}
