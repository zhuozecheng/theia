import { injectable, inject } from "inversify";
import {
    KeybindingContext, Keybinding, KeybindingContribution, KeybindingRegistry, KeyCode, Key, Modifier
} from "../../application/common";
import { EditorManager } from "./editor-manager";

@injectable()
export class EditorKeybindingContext extends KeybindingContext {

    static ID = 'editor.keybinding.context';

    constructor( @inject(EditorManager) protected readonly editorService: EditorManager) {
        super(EditorKeybindingContext.ID);
    }

    isEnabled(arg?: Keybinding) {
        return this.editorService && !!this.editorService.activeEditor;
    }

}

@injectable()
export class EditorKeybindingContribution implements KeybindingContribution {

    constructor(
        @inject(EditorKeybindingContext) protected readonly editorKeybindingContext: EditorKeybindingContext
    ) { }

    contribute(registry: KeybindingRegistry): void {
        [
            {
                commandId: 'editor.close',
                context: this.editorKeybindingContext,
                keyCode: KeyCode.createKeyCode({ first: Key.KEY_W, modifiers: [Modifier.M3] })
            },
            {
                commandId: 'editor.close.all',
                context: this.editorKeybindingContext,
                keyCode: KeyCode.createKeyCode({ first: Key.KEY_W, modifiers: [Modifier.M2, Modifier.M3] })
            }
        ].forEach(binding => {
            registry.registerKeyBinding(binding);
        });

    }

}