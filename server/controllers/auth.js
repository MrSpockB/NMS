var validator = require('validator');
var passport = require('passport');

exports.signup = function(req, res, next)
{
	var validationResult = validateSignupForm(req.body);
	if(!validationResult.success)
		return res.status(400).json({ success: false, message: validationResult.message, errors: validationResult.errors });
	
	passport.authenticate('local-signup', function(err, info)
	{
		if(err)
		{
			if(err.name === "MongoError" && err.code === 11000)
				return res.status(409).json({ success: false, message: "Verifica el formulario.", errors: { email: "Este email ya tiene usuario." } });
			
			return res.status(400).json({ success: false, message: "Error al procesar el formulario." });
		}
		return res.status(200).json({ success: true, message: 'Usuario creado' });
	})(req, res, next);
}

exports.login = function(req, res, next)
{
	var validationResult = validateLoginForm(req.body);
	if(!validationResult.success)
		return res.status(400).json({ success: false, message: validationResult.message, errors: validationResult.errors });
	passport.authenticate('local-login', function(err, token, userData){
		if(err)
		{
			if(err.name === "CredencialesIncorrectasError")
				return res.status(400).json({ success: false, message: err.message });
			return res.status(400).json({ success: false, message: "No se pudo procesar el form" });
		}
		return res.json({ success:true, message: "Has podido acceder!", token: token, userData: userData});
	})(req, res, next);
}

function validateSignupForm(payload)
{
	var isFormValid = true;
	var errors = {};
	var message = '';

	if(!payload.email || !validator.isEmail(payload.email))
	{
		isFormValid = false;
		errors.email = "Email invalido";
	}
	if(!payload.password || !validator.isLength(payload.password, 8))
	{
		isFormValid = false;
		errors.password = "La contraseña necesita ser de minimo 8 caracteres";
	}
	if(!payload.name || payload.name.trim().length === 0)
	{
		isFormValid = false;
		errors.name = "Falta el nombre";
	}
	if(!payload.username || payload.username.trim().length === 0)
	{
		isFormValid = false;
		errors.username = "Falta el nombre";
	}
	if(!isFormValid)
	{
		message = "Revisa el formulario";
	}
	return {
		success: isFormValid,
		message: message,
		errors: errors
	};
}

function validateLoginForm(payload)
{
	var isFormValid = true;
	var errors = {};
	var message = '';


	if(!payload.email || payload.email.trim().length === 0)
	{
		isFormValid = false;
		errors.email = "Falta el mail";
	}
	if(!payload.password || payload.password.trim().length === 0)
	{
		isFormValid = false;
		errors.password = "Falta la contraseña";
	}
	if(!isFormValid)
	{
		message = "Revisa el formulario";
	}
	return {
		success: isFormValid,
		message: message,
		errors: errors
	};
}