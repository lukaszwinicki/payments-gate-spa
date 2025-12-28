import Swal from 'sweetalert2'

export async function showErrorDialog(
    message: string,
    title = 'Error'
) {
    await Swal.fire({
        icon: 'error',
        title,
        text: message,
        confirmButtonColor: '#ef4444',
    })
}
