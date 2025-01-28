import Swal from "sweetalert2";

export class AlertService {
  static showSuccessTimerAlert(title: string, text: string) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  static showErrorTimerAlert(title: string, text: string) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
