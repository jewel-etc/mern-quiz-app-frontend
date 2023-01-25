export const validate = (inputState, isLoggedIn, isAdmin, token, item) => {

    let error = {};

    for (let key1 in inputState) {

        for (let key2 in inputState[key1]) {

            if (item === 'question') {

                if (key2 && key2 === 'question') {
                    if (inputState[key1][key2].value.trim().length === 0) {

                        error[key2] = "Enter a valid question"
                    }

                }
                if ((key2 && key2 === 'description') || (key2 && key2 === 'explanation')) {
                    if (inputState[key1][key2].value.trim().length > 500) {
                        error[key2] = "Not more than 500 letters"
                    }
                }
                if (key2 && (key2 === 'option1' || key2 === 'option2' || key2 === 'option3'
                    || key2 === 'option4' || key2 === 'correctOption')) {

                    if (inputState[key1][key2].value.trim().length === 0) {
                        error[key2] = "Enter valid option"
                    }

                }

            } else {
                if (key2 && key2 === 'name' && !isLoggedIn && !isAdmin) {

                    if (inputState[key1][key2].value.trim().length === 0) {

                        error[key2] = "Enter a valid name"
                    }


                }

                if (key2 && key2 === 'name' && token) {

                    if (inputState[key1][key2].value.trim().length === 0) {

                        error[key2] = "Enter a valid name"
                    }


                }


                if (key2 && key2 === 'username') {
                    if (inputState[key1][key2].value.trim().length < 6) {
                        error[key2] = "Username contains at least 6 characters"

                    }
                }

                if (key2 && (key2 === 'password' || key2 === 'newPassword' || key2 === 'oldPassword')) {

                    if (inputState[key1][key2].value.trim().length < 6) {
                        error[key2] = "Password contains at least 6 characters"

                    }


                }
                if (key2 && key2 === 'confirmPassword') {
                    if ((inputState.inputs.newPassword.value !== inputState.inputs.confirmPassword.value)
                        || (inputState.inputs.confirmPassword.value.length === 0))

                        error[key2] = "New & Confirm password must be same"

                    else if (inputState.inputs.newPassword.value === inputState.inputs.confirmPassword.value)

                        error[key2] = "New & Confirm password matched"


                }
                if (key2 && key2 === 'oldPassword') {

                    if (inputState.inputs.newPassword.value === inputState.inputs.oldPassword.value)
                        error[key2] = "New & Old password must be different"

                }
                if (key2 && key2 === 'adminPassword' && isLoggedIn && isAdmin) {

                    if (isLoggedIn && isAdmin && inputState[key1][key2].value.trim().length < 8) {
                        error[key2] = "Password contains at least 8 characters"
                    }
                }
                if (key2 && key2 === 'title') {
                    if (inputState[key1][key2].value.trim().length === 0) {
                        error[key2] = "valid title"
                    }
                }
               


            }


        }


        return error


    }

}
