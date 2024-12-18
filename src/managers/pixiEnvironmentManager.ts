import {
  MarkdownString,
  LogOutputChannel,
  Event,
  ThemeIcon,
  ProgressLocation,
  CancellationError,
  CancellationToken,
  ProgressOptions,
  Progress,
  window,
} from "vscode";
import {
  CreateEnvironmentScope,
  DidChangeEnvironmentEventArgs,
  DidChangeEnvironmentsEventArgs,
  EnvironmentManager,
  GetEnvironmentScope,
  GetEnvironmentsScope,
  IconPath,
  PythonEnvironment,
  PythonEnvironmentApi,
  RefreshEnvironmentsScope,
  ResolveEnvironmentContext,
  SetEnvironmentScope,
} from "../api";

import { createDeferred, Deferred } from "../common/deferred";

import { Pixi } from "../managers/pixiAPI";
import { withProgress } from "../common/windowAPI";
import * as vscode from "vscode";

// get full path to the icon relative to extension path
// "assets/images/VSCodePrefix-Dev-Logo.png"

export class PixiEnvironmentManager implements EnvironmentManager {
  name: string = "Pixi";
  displayName: string = "Pixi Environment Manager";
  preferredPackageManagerId: string = 'ms-python.python:pixi';
  description: string =
    "Manage Pixi project environments";
  tooltip: string | MarkdownString = "Pixi environment manager";
  iconPath: IconPath = new ThemeIcon("prefix-dev");
  outputChannel: LogOutputChannel;
  pixi_projects: Pixi[];
  api: PythonEnvironmentApi;

  // Event to be raised with the list of available extensions changes for this manager
  onDidChangeEnvironments?: Event<DidChangeEnvironmentsEventArgs> | undefined;

  // Event to be raised when the environment for any active scope changes
  onDidChangeEnvironment?: Event<DidChangeEnvironmentEventArgs> | undefined;

  constructor(
    outputChannel: LogOutputChannel,
    pixi_projects: Pixi[],
    api: PythonEnvironmentApi
  ) {
    this.outputChannel = outputChannel;
    this.pixi_projects = pixi_projects;
    this.api = api;
  }

  private collection: PythonEnvironment[] = [];

  private _initialized: Deferred<void> | undefined;

  async initialize(): Promise<void> {
    if (this._initialized) {
      return this._initialized.promise;
    }

    this._initialized = createDeferred<void>();

    // Code to initialize the environment manager goes here
    // This may involve reading configuration, setting up event listeners etc.
    await withProgress(
      {
        location: ProgressLocation.Window,
        title: "Pixi Environment Manager",
        cancellable: true,
      },
      async (progress, token) => {
        progress.report({ message: "Initializing Pixi Environment Manager" });

        this.pixi_projects.forEach((pixi) => {
          pixi.pixiInfo.environments_info.forEach((env) => {
            let tooltip_markdown = new MarkdownString();
            tooltip_markdown.appendMarkdown(`# ${env.name}\n`);
            tooltip_markdown.appendMarkdown(`**features**: ${env.features.join(", ")}\n\n`);
            tooltip_markdown.appendMarkdown(`**prefix**: \`${env.prefix}\``);
            const environment = this.api.createPythonEnvironmentItem(
              {
                name: env.name,
                displayName: env.name,
                shortDisplayName: `${env.name}_short`,
                displayPath: `${env.name}_path`,
                version: `${env.name}_version`,
                environmentPath: vscode.Uri.file(env.prefix),
                sysPrefix: env.prefix,
                description: `features: ${env.features.join(", ")}`,
                tooltip: tooltip_markdown,
                execInfo: {
                  run: {
                    executable: "pixi",
                    args: ["run", "--environment", env.name, "python"],
                  },
                  activation: [
                    {
                      executable: "pixi",
                      args: ["shell", "--environment", env.name],
                    },
                  ],
                  // TODO:: figure out deactivation
                },
              },
              this
            );
            this.collection.push(environment);
          });
        });
      }
    );
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

  async refresh(scope: RefreshEnvironmentsScope): Promise<void> {
    // Code to handle refreshing environments goes here
    // This is called when the user clicks on the refresh button in the UI

    if (scope !== undefined) {
      // exit function
      return;
    }


    throw new Error("Method not implemented.");
  }

  async getEnvironments(
    scope: GetEnvironmentsScope
  ): Promise<PythonEnvironment[]> {
    // Code to get the list of environments goes here
    // This may be called when the python extension is activated to get the list of environments

    await this.initialize();

    if (scope === "all") {
      return Array.from(this.collection);
    }

    if (scope === "global") {
      return this.collection.filter((env) => {
        env.name === "base";
      });
    }

    if (scope instanceof vscode.Uri) {
      throw new Error("Method not implemented.");
    }

    return [];
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
