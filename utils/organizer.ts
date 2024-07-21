import { FileV2 } from "@prisma/client";

export type ModuleV2 = {
  title: string;
  lessons: File2[];
  modules: Record<string, ModuleV2>;
};

export type ModuleV3 = {
  title: string;
  lessons: FileV2[];
  modules: Record<string, ModuleV3>;
};

type File2 = {
  name: string;
  path: string;
  isCompleted: boolean;
  type: string;
  relativePath: string;
  duration?: number | undefined | undefined;
  elapsedTime?: number | undefined | undefined;
};

const createModule = (title: string, parent: ModuleV2 | ModuleV3) => {
  parent.modules[title] = {
    title: title,
    lessons: [],
    modules: {},
  };
  //console.log(title);

  return parent.modules[title];
};

export const organizeLessons = (title: string, lessons: File2[]) => {
  const modules: ModuleV2 = {
    title: title,
    lessons: [],
    modules: {},
  };

  lessons.forEach((l) => {
    if (l.relativePath == "") {
      modules.lessons.push(l);
    } else {
      const [module, ...submodules] = l.relativePath.split("\\");
      if (!modules.modules[module]) {
        createModule(module, modules);
      }

      if (submodules.length == 0) {
        modules.modules[module].lessons.push(l);
      } else {
        submodules.forEach((s) => {
          let m = modules.modules[module].modules[s];
          if (!m) {
            m = createModule(s, modules.modules[module]) as ModuleV2;
          }
          m.lessons.push(l);
        });
      }
    }
  });

  return modules;
};

export function sortModulesAlphabetically(module: ModuleV2): ModuleV2 {
  const sortedModules = Object.keys(module.modules)
    .sort((a, b) => a.localeCompare(b))
    .reduce((sorted, key) => {
      sorted[key] = sortModulesAlphabetically(module.modules[key]);
      return sorted;
    }, {} as Record<string, ModuleV2>);

  return {
    ...module,
    modules: sortedModules,
  };
}

export const organizeLessonsV2 = (title: string, lessons: FileV2[]) => {
  const modules: ModuleV3 = {
    title: title,
    lessons: [],
    modules: {},
  };

  lessons.forEach((l) => {
    if (l.relativePath == "") {
      modules.lessons.push(l);
    } else {
      const paths = l.relativePath.split("\\");
      let currentModule = modules;

      paths.forEach((part, index) => {
        if (!currentModule.modules[part]) {
          currentModule = createModule(part, currentModule) as ModuleV3;
        } else {
          currentModule = currentModule.modules[part];
        }

        // Se for o último elemento no caminho, adiciona a lição
        if (index === paths.length - 1) {
          currentModule.lessons.push(l);
        }
      });
    }
  });

  return modules;
};

// export const organizeLessonsV2 = (title: string, lessons: FileV2[]) => {
//   const modules: ModuleV3 = {
//     title: title,
//     lessons: [],
//     modules: {},
//   };

//   lessons.forEach((l) => {
//     if (l.relativePath == "") {
//       modules.lessons.push(l);
//     } else {
//       const [module, ...submodules] = l.relativePath.split("\\");
//       if (!modules.modules[module]) {
//         console.log(module);
//         createModule(module, modules);
//       }

//       if (submodules.length == 0) {
//         modules.modules[module].lessons.push(l);
//       } else {
//         submodules.forEach((s) => {
//           let m = modules.modules[module].modules[s];
//           if (!m) {
//             console.log(s);
//             m = createModule(s, modules.modules[module]) as ModuleV3;
//           }
//           m.lessons.push(l);
//         });
//       }
//     }
//   });

//   return modules;
// };
