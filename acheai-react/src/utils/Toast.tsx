import { nanoid } from 'nanoid';
import { useToastStore } from '@/stores/toast.store';

const TOAST_ID_SIZE = 8;

export class Toast {
  private static get state() {
    return useToastStore.getState();
  }

  static push(
    title: string,
    message: string,
    intent: 'info' | 'success' | 'error' | 'warning',
    duration: number = 3000,
  ) {
    Toast.state.push({
      id: nanoid(TOAST_ID_SIZE),
      title,
      message,
      intent,
      createdAt: new Date(),
      duration,
    });
  }

  static remove(id: string) {
    Toast.state.remove(id);
  }

  static info(messageOrTitle: string, message?: string) {
    Toast.push(
      message ? messageOrTitle : 'Info',
      message ? message : messageOrTitle,
      'info',
    );
  }

  static success(messageOrTitle: string, message?: string) {
    Toast.push(
      message ? messageOrTitle : 'Success',
      message ? message : messageOrTitle,
      'success',
    );
  }

  static error(messageOrTitle: string, message?: string) {
    Toast.push(
      message ? messageOrTitle : 'Error',
      message ? message : messageOrTitle,
      'error',
    );
  }

  static warning(messageOrTitle: string, message?: string) {
    Toast.push(
      message ? messageOrTitle : 'Warning',
      message ? message : messageOrTitle,
      'warning',
    );
  }
}
