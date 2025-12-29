import Swal from 'sweetalert2'

type DialogIcon = 'success' | 'error' | 'warning' | 'info' | 'question'

export async function showDialog(
  icon: DialogIcon,
  message: string,
  title: string = 'Info'
) {
  const buttonColors: Record<DialogIcon, string> = {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#facc15',
    info: '#2563eb',
    question: '#2563eb',
  }

  await Swal.fire({
    icon,
    title,
    html: message,
    confirmButtonColor: buttonColors[icon],
  })
}
