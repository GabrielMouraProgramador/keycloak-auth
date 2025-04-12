<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1>Sign In</h1>
            <p class="text-medium-emphasis">Enter your details to get started</p>
            <div calss="h-50">
              <v-alert
                v-model="alert.active"
                variant="tonal"
                color="rgb(220 38 38)"
                class="text-start"
                closable
                border="start"
                border-color="rgb(220 38 38)"
              >
                <template v-slot:default>
                  <div class="d-flex justify-start gap-2">
                    <v-icon
                      color="rgb(220 38 38)"
                      icon="mdi-alert-circle"
                      size="large"
                      class="my-auto"
                    ></v-icon>
                    <p class="my-auto text-sm md:text-base text-red-600">
                      {{ alert.text }}
                    </p>
                  </div>
                </template>
              </v-alert>
            </div>

            <VForm @submit.prevent="submit" class="mt-7">
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email">Email</label>
                <VTextField
                  :rules="[ruleRequired, ruleEmail]"
                  v-model="email"
                  prepend-inner-icon="fluent:mail-24-regular"
                  id="email"
                  name="email"
                  type="email"
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="password">Password</label>
                <VTextField
                  :rules="[ruleRequired, rulePassLen]"
                  v-model="password"
                  prepend-inner-icon="fluent:password-20-regular"
                  id="password"
                  name="password"
                  type="password"
                />
              </div>
              <div class="mt-5">
                <VBtn type="submit" block min-height="44" class="gradient primary">Sign In</VBtn>
              </div>
            </VForm>

            <p class="text-body-2 mt-4">
              <span
                >Don't have an account?
                <NuxtLink to="/signup" class="font-weight-bold text-primary"
                  >Sign Up</NuxtLink
                ></span
              >
            </p>
          </VCol>
        </VRow>
      </VCol>
      <VCol class="hidden-md-and-down fill-height" md="6" lg="7">
        <VImg
          src="https://wallpaper.dog/large/5557744.jpg"
          cover
          class="h-100 rounded-xl d-flex align-center justify-center"
        >
          <div class="text-center w-50 text-white mx-auto">
            <h2 class="mb-4">Start your journey today</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, inventore quia.
              Dolorum dolores ad ipsum voluptatum rem, hic placeat, odio, odit numquam quod
              veritatis accusantium assumenda! Sequi, provident in! Iure!
            </p>
          </div>
        </VImg>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
const { ruleEmail, rulePassLen, ruleRequired } = useFormRules();

const email = ref("");
const password = ref("");
const alert = ref({
  active: false,
  text: "",
});

const submit = async () => {
  alert.value.active = false;
  alert.value.text = "";
  try {
    const { data, error } = await $fetch<{
      data: any;
      error: any;
    }>("http://localhost:8000/auth/login-admin", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });
    if (error) {
      alert.value.active = true;
      alert.value.text = error;
      return;
    }

    window.location.href = `${data.redirect}?token=${data.data_token.access_token}&refresh=${data.data_token.refresh_token}`;
  } catch (err) {
    console.error(err);
    alert.value.active = true;
    alert.value.text = "Não foi possível fazer login.";
  }
};
</script>
