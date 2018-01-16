exports.list = function(req, res) {
	req.getConnection(function(err,connection) {
		var query = connection.query('select *,DATE_FORMAT(date,"%Y-%m-%d") AS date from task', function(err,rows) {
			if (err) {
				console.log("Error Selecting : %s", err);
			}
			res.render('task', {page_title:"task",data:rows});
		});
	});
};

exports.add = function(req, res) {
	res.render('add_task', {page_title:"Add Task"});
};

exports.save = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));

	req.getConnection(function(err,connection) {
		var data = {
			name : input.name,
			date : input.date,
			type : input.type,
		};
		var query = connection.query("INSERT INTO task set ?", data, function(err, rows) {
			if (err) {
				console.log("Error inserting : %s", err);
			}
			res.redirect('/');
		})
	})
};

exports.edit = function(req, res) {
	var id = req.params.id;
	req.getConnection(function(err,connection) {
		var query = connection.query('select *,DATE_FORMAT(date,"%Y-%m-%d") AS date from task where id = ?',[id],function(err,rows) {
			if (err) {
				console.log("Error Selecting : %s", err);
			}
			res.render('edit_task', {page_title:"edit task",data:rows});
		})
	})
}

exports.save_edit = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	req.getConnection(function(err,connection) {
		var data = {
			name : input.name,
			date : input.date,
			type : input.type,
		};
		connection.query('UPDATE task set ? WHERE id = ?',[data,id],function(err,rows) {
			if (err) {
				console.log("Error updating : %s", err);
			}
			res.redirect('/');
		})
	})
}

exports.delete_customer = function(req, res) {
	var id = req.params.id;
	req.getConnection(function(err,connection) {
		connection.query('DELETE FROM task where id = ?',[id],function(err,rows) {
			if (err) {
				console.log("Error deleting : %s", err);
			}
			res.redirect('/');
		})
	})
}