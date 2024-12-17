/**
 * Shell Utility Module
 * 
 * This module provides utility functions to execute shell commands in a Node.js environment.
 * 
 * Usage:
 * 
 * 1. Execute a shell command:
 * 
 *    execShell("ls")
 *      .then(output => console.log(output))
 *      .catch(error => console.error(error));
 * 
 * 2. Execute a shell command with a timeout:
 * 
 *    execShellWithTimeout("sleep 5", 1000)
 *      .then(output => console.log(output))
 *      .catch(error => console.error(error)); // Error: Command execution timed out
 * 
 * 3. Execute a shell command and stream the output:
 * 
 *    execShellStream("ls", console.log)
 *      .then(() => console.log("Command executed"))
 *      .catch(error => console.error(error));
 * 
 * Functions:
 * - execShell: Executes a shell command and returns a promise that resolves with the command's output.
 * - execShellWithTimeout: Executes a shell command with a specified timeout.
 * - execShellStream: Executes a shell command and streams the output to a callback function.
 */

import * as cp from "child_process";

/**
 * Executes a shell command and returns a promise that resolves with the command's output.
 * @param cmd - The shell command to execute.
 * @param cwd - The path to run the command in (optional).
 * @returns A promise that resolves with the output of the command.
 */
const execShell = (cmd: string, cwd?: string): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		cp.exec(cmd, { cwd }, (err, out) => {
			if (err) {
				reject(err);
			} else {
				resolve(out);
			}
		});
	});
};

/**
 * Executes a shell command with a specified timeout.
 *
 * @param cmd - The shell command to execute.
 * @param timeout - The timeout value in milliseconds.
 * @param cwd - The path to run the command in (optional).
 * @returns A promise that resolves with the command output or rejects with an error.
 *
 * @example
 * execShellWithTimeout("ls", 1000)
 *    .then((output) => console.log(output))
 *   .catch((error) => console.error(error));
 *
 * execShellWithTimeout("sleep 5", 1000)
 *   .then((output) => console.log(output))
 *  .catch((error) => console.error(error)); // Error: Command execution timed out
 */
export const execShellWithTimeout = (
	cmd: string,
	timeout: number,
	cwd?: string
): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const timeoutId = setTimeout(() => {
			reject(new Error("Command execution timed out"));
		}, timeout);

		execShell(cmd, cwd)
			.then((output) => {
				clearTimeout(timeoutId);
				resolve(output);
			})
			.catch((error) => {
				clearTimeout(timeoutId);
				reject(error);
			});
	});
};

/**
 * Executes a shell command and streams the output to a callback function.
 *
 * @param cmd - The shell command to execute.
 * @param onData - Callback function to handle the command's output.
 * @param cwd - The path to run the command in (optional).
 * @returns A promise that resolves when the command execution is complete.
 *
 * @example
 * execShellStream("ls", console.log)
 *    .then(() => console.log("Command executed"))
 *    .catch(error => console.error(error));
 */
export const execShellStream = (
	cmd: string,
	onData: (data: string) => void,
	cwd?: string
): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		const child = cp.exec(cmd, { cwd });

		child.stdout?.on("data", onData);
		child.stderr?.on("data", onData);

		child.on("close", (code) => {
			if (code !== 0) {
				reject(new Error(`Command failed with exit code ${code}`));
			} else {
				resolve();
			}
		});

		child.on("error", reject);
	});
};
