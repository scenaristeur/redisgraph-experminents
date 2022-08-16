<template>
  <div >
    <!-- <div >
    <h1 style="text-align:center">This is vue editor.js <a href="https://twitter.com/@code4mk" target="_blank">@code4mk</a></h1>
  </div> -->

  <div class="editorx_body">
    <!--editorjs id-->
    <div class id="codex-editor"/>
  </div>
  <button style="margin-left: 30%;" type="button" name="button" @click="save()">save</button>
  <div class="editorx_body">
    <pre>{{value}}</pre>
  </div>
</div>
</template>

<script>
// https://medium.com/code4mk-org/editorjs-vue-a78110c3fff8
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Undo from 'editorjs-undo';
import DragDrop from 'editorjs-drag-drop';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import Warning from '@editorjs/warning';


export default {
  name: 'EditorSimple',
  data() {
    return {
      value: null,
      initData: {
        time: 1554508385558,
        blocks: [
          { type: "header", data: { text: "Hello Vue/Editor.js", level: 2 } },
          {
            type: "list",
            data: {
              style: "ordered",
              items: ["Learn Vue.js<br>", "Learn Editor.js"]
            }
          },
          {
            type: "quote",
            data: {
              text: "This is awesome block based editor.<br>",
              caption: "",
              alignment: "left"
            }
          },
          { type: "delimiter", data: {} },
          {
            type: "warning",
            data: {
              title: "Warning",
              message: "Open Development Tools console"
            }
          },
          { type: "delimiter", data: {} }
        ],
        version: "2.12.3"
      }
    };
  },
  methods: {
    save: function() {
      window.editor.save().then(savedData => {
        console.log(savedData);
        this.value = savedData;
      });
    },
    myEditor: function() {
      window.editor = new EditorJS({
        holder: "codex-editor",
        autofocus: true,
        /**
        * This Tool will be used as default
        */
        defaultBlock: "paragraph",
        tools: {
          header: {
            class: Header,
            shortcut: "CMD+SHIFT+H"
          },
          list: {
            class: List
          },
          paragraph: {
            class: Paragraph,
            config: {
              placeholder: "."
            }
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
          delimiter: Delimiter,
          warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+W',
            config: {
              titlePlaceholder: 'Title',
              messagePlaceholder: 'Message',
            },
          },
        },
        data: this.initData,


        onReady: () => {
          console.log("ready");
          let editor = window.editor
          new Undo({ editor });
          new DragDrop(editor);



        },

        onChange: function() {
          console.log("change");
        }
      });
    }
  },
  mounted: function() {
    this.myEditor();
  }
};
</script>

<style lang="css" scoped >
.editorx_body {
  /* width: 62%;
  margin-left: 15%; */
  width: 60%;
  margin-left: 20%;
  border: 2px solid #f1f3f5;
  box-sizing: border-box;
}
.ce-block--focused {
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 0.5438550420168067) 35%,
    rgba(0, 212, 255, 1) 100%
    );
  }
  </style>
