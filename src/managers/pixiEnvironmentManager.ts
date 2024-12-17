import { MarkdownString, LogOutputChannel, Event, ThemeIcon } from "vscode";
import {
  CreateEnvironmentScope,
  DidChangeEnvironmentEventArgs,
  DidChangeEnvironmentsEventArgs,
  EnvironmentManager,
  GetEnvironmentScope,
  GetEnvironmentsScope,
  IconPath,
  PythonEnvironment,
  RefreshEnvironmentsScope,
  ResolveEnvironmentContext,
  SetEnvironmentScope,
} from "../api";
import * as vscode from "vscode";

// get full path to the icon relative to extension path
// "assets/images/VSCodePrefix-Dev-Logo.png"


export class PixiEnvironmentManager implements EnvironmentManager {
  name: string = "Pixi";
  displayName: string = "Pixi Environment Manager";
  preferredPackageManagerId: string = "pixi-vscode.pixi";
  description: string =
    "Manage environments using the Pixi environment manager";
  tooltip: string | MarkdownString = "Pixi environment manager";
  iconPath: IconPath = new ThemeIcon("prefix-dev");
  outputChannel: LogOutputChannel;

  // Event to be raised with the list of available extensions changes for this manager
  onDidChangeEnvironments?: Event<DidChangeEnvironmentsEventArgs> | undefined;

  // Event to be raised when the environment for any active scope changes
  onDidChangeEnvironment?: Event<DidChangeEnvironmentEventArgs> | undefined;

  constructor(outputChannel: LogOutputChannel) {
    this.outputChannel = outputChannel;
  }

  create?(
    scope: CreateEnvironmentScope
  ): Promise<PythonEnvironment | undefined> {
    // Code to handle creating environments goes here

    throw new Error("Method not implemented.");
  }

  remove?(environment: PythonEnvironment): Promise<void> {
    // Code to handle removing environments goes here

    throw new Error("Method not implemented.");
  }

  refresh(scope: RefreshEnvironmentsScope): Promise<void> {
    // Code to handle refreshing environments goes here
    // This is called when the user clicks on the refresh button in the UI

    throw new Error("Method not implemented.");
  }

  getEnvironments(scope: GetEnvironmentsScope): Promise<PythonEnvironment[]> {
    // Code to get the list of environments goes here
    // This may be called when the python extension is activated to get the list of environments

    throw new Error("Method not implemented.");
  }

  set(
    scope: SetEnvironmentScope,
    environment?: PythonEnvironment
  ): Promise<void> {
    // User selected a environment for the given scope
    // undefined environment means user wants to reset the environment for the given scope

    throw new Error("Method not implemented.");
  }
  get(scope: GetEnvironmentScope): Promise<PythonEnvironment | undefined> {
    // Code to get the environment for the given scope goes here

    throw new Error("Method not implemented.");
  }

  resolve(
    context: ResolveEnvironmentContext
  ): Promise<PythonEnvironment | undefined> {
    // Code to resolve the environment goes here. Resolving an environment means
    // to convert paths to actual environments

    throw new Error("Method not implemented.");
  }

  clearCache?(): Promise<void> {
    // Code to clear any cached data goes here

    throw new Error("Method not implemented.");
  }
}
