//Task 2 and Task 4:
var vincent = {}

vincent.name = "Vincent";
vincent.surname ="Law";
vincent.id = "0724FGARK";
vincent.hi = function() {
	return "Hello " + this.name + " " + this.surname;
}


//Task 3 and Task 4:
var rel = {
	name: "Rel",
	surname: "Mayer",
	id: "Real124C41",
	hi: function() {
		return "Hello " + this.name + " " + this.surname;
	}
}

//Task 5:
var person = function(name, surname, id){
	return {
		name : name,
		surname : surname,
		id : id,
		hi : function() {
			return "Hello " + this.name + " " + this.surname;
		}
	}
}

var vincent2 = person('Vincent', 'Law', '0724FGARK');
var rel2 = person('Rel', 'Mayer', 'Real124C41');

//Task 6 and Task 7
var developer = function(name, surname, id, language, age){
	that = person(name, surname, id);
	that.language = language;

	var _age = age;

	var _formatAge = function() {
		return _age + 'yo';
	};

	that.coding = function() {
		return this.name + " likes " + this.language;
	};

	that.getAge = function() {
		return _age;
	};

	that.setAge = function(value) {
		_age = value;
	};

	that.printAge = function() {
		return this.name + ' is ' + _formatAge();
	};

	return that;
}

var raul = developer('Raul', 'Creed', '123456', 'JavaScript');
var raul2 = developer('Raul', 'Creed', '123456', 'JavaScript', 21);

//Task 8
var Person = function(name, surname, id) {
	this.name = name;
	this.surname = surname;
	this.id = id;
}

Person.prototype.hi = function() {
	return "Hello " + this.name + " " + this.surname ;
}

var vincent3 = new Person('Vincent', 'Law', '0724FGARK');
var rel3 = new Person('Rel', 'Mayer', 'Real124C41');

//Task 9 and Task 10
var Developer = function(name, surname, id, language, age){
	Person.call(this, name, surname, id);
	this.language = language;

	var _age = age;

	var _formatAge = function() {
		return _age + 'yo';
	}

	this.printAge = function() {
		return this.name + ' is ' + _formatAge();
	}

	this.getAge = function() {
		return _age;
	}

	this.setAge = function(value) {
		_age = value;
	}
}

Developer.prototype = Object.create(Person.prototype);

Developer.prototype.coding = function() {
	return this.name + " likes " + this.language;
}

var raul3 = new Developer('Raul', 'Creed', '123456', 'JavaScript');
var raul4 = new Developer('Raul', 'Creed', '123456', 'JavaScript', 21);