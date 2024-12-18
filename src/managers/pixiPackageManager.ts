import {
  PackageManager,
  PythonEnvironment,
  DidChangePackagesEventArgs,
  Package,
  PackageInstallOptions,
  PackageChangeKind,
  Installable,
} from "../api";
import {
  Event,
  EventEmitter,
  LogOutputChannel,
} from "vscode";
import { Pixi } from "./pixiAPI";
import { execShellWithTimeout } from "../common/shell";


function getChanges(
  before: Package[],
  after: Package[]
): { kind: PackageChangeKind; pkg: Package }[] {
  const changes: { kind: PackageChangeKind; pkg: Package }[] = [];
  before.forEach((pkg) =>
    changes.push({ kind: PackageChangeKind.remove, pkg })
  );
  after.forEach((pkg) => changes.push({ kind: PackageChangeKind.add, pkg }));
  return changes;
}

export class PixiPackageManager implements PackageManager {
  readonly name = "pixi";
  readonly displayName = "Pixi DisplayName";
  readonly description = "Manage packages using the Pixi package manager";
  readonly tooltip = "Pixi package manager";
  readonly log: LogOutputChannel;

  private packages: Map<string, Package[]> = new Map();

  private readonly _onDidChangePackages =
    new EventEmitter<DidChangePackagesEventArgs>();

  // /**
  //  * Event that is fired when packages change.
  //  */
  readonly onDidChangePackages: Event<DidChangePackagesEventArgs> =
    this._onDidChangePackages.event;

  constructor(log: LogOutputChannel) {
    this.log = log;
  }

  /**
   * Installs packages in the specified Python environment.
   * @param environment - The Python environment in which to install packages.
   * @param packages - The packages to install.
   * @returns A promise that resolves when the installation is complete.
   */
  install(
    environment: PythonEnvironment,
    packages: string[],
    options: PackageInstallOptions
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * Uninstalls packages from the specified Python environment.
   * @param environment - The Python environment from which to uninstall packages.
   * @param packages - The packages to uninstall, which can be an array of packages or strings.
   * @returns A promise that resolves when the uninstall is complete.
   */
  uninstall(
    environment: PythonEnvironment,
    packages: Package[] | string[]
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * Refreshes the package list for the specified Python environment.
   * @param environment - The Python environment for which to refresh the package list.
   * @returns A promise that resolves when the refresh is complete.
   */
  refresh(environment: PythonEnvironment): Promise<void> {
    throw new Error("Method not implemented.");
  }

  /**
   * Retrieves the list of packages for the specified Python environment.
   * @param environment - The Python environment for which to retrieve packages.
   * @returns An array of packages, or undefined if the packages could not be retrieved.
   */
  getPackages(environment: PythonEnvironment): Promise<Package[] | undefined> {
    throw new Error("Method not implemented.");
  }

  /**
   * Get a list of installable items for a Python project.
   *
   * @param environment The Python environment for which to get installable items.
   *
   * Note: An environment can be used by multiple projects, so the installable items returned.
   * should be for the environment. If you want to do it for a particular project, then you should
   * ask user to select a project, and filter the installable items based on the project.
   */
  getInstallable?(environment: PythonEnvironment): Promise<Installable[]> {
    throw new Error("Method not implemented.");
  }

  /**
   * Clears the package manager's cache.
   * @returns A promise that resolves when the cache is cleared.
   */
  clearCache?(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
