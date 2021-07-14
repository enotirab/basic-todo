
const client = require('../database/connection');


module.exports.listAll = async function (req, res, next) {

    try {

        const client = require('../database/connection');
        let response = await client.query('SELECT * from todo_items order by complete, id DESC;');

        res.render( 'all_todos', {
            todoItems: response.rows
        });

    } catch (err) {
        console.log('there was an error');
        res.send(err);
    }

};


module.exports.displayAddItem = (req, res) => {
    res.render('newItem')
};

module.exports.addNewItem = async (req, res) => {

    const client = require('../database/connection');

    let response = await client.query('insert into todo_items (description) values ($1);', [req.body.description]);
    res.redirect('/');
};


module.exports.viewEditItem = async (req, res) => {

    try {
        const client = require('../database/connection');
        let response = await client.query('SELECT * from todo_items where id = $1;', [req.params.id]);

        res.render('editItem', { item: response.rows[0] })
    }catch(err){
        console.log('There was an error');
        console.log(err);
    }

};


module.exports.saveEditItem = async (req, res) => {

    const client = require('../database/connection');

    let response = await client.query('update todo_items set description = ($1) where id = $2;', [req.body.description, req.params.id]);
    res.redirect('/');
};


module.exports.deleteItem = async (req, res) => {

    try {

        const client = require('../database/connection');
        let response = await client.query('delete from todo_items where id = $1;', [req.params.id]);
    }catch(err){
        console.log("there was an error");
        console.log(err);
    }

    res.redirect('/');
};


module.exports.makeItemComplete = async (req, res) => {

    try {
        const client = require('../database/connection');
        let response = await client.query('UPDATE todo_items SET complete = true where id = $1;', [req.params.id]);
    }catch(err){
        console.log("there was an error");
        console.log(err);
    }

    res.redirect('/');
};


module.exports.markeItemIncomplete = async (req, res) => {

    try {
        const client = require('../database/connection');
        let response = await client.query('UPDATE todo_items SET complete = false where id = $1;', [req.params.id]);
    }catch(err){
        console.log("there was an error");
        console.log(err);
    }

    res.redirect('/');
};


