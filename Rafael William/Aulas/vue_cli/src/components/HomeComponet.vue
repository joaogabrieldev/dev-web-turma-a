<template>
    <div>
        <footer id = "footer">
            <p>Bem vindo {{ nome }} ola mundo do <b>VUE com CLI</b></p>
        </footer>

    </div>
</template>

<script>
export default {
    name: 'HomeComponet',
    data() {
        return {
            nome: 'Rafael'
        }
    }
}
</script>

