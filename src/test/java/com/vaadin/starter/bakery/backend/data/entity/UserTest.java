package com.vaadin.starter.bakery.backend.data.entity;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

/**
 * Classe de teste unitário para a entidade {@link User}.
 * <p>
 * Verifica especificamente o método equals() da classe User,
 * garantindo que a comparação entre dois objetos User funciona
 * de acordo com os campos relevantes definidos na implementação
 * de equals() dessa classe.
 */
public class UserTest {

    /**
     * Testa o comportamento do método equals() da classe User.
     * <ul>
     *   <li>Cria dois objetos User com valores semelhantes, mas
     *       com algumas diferenças iniciais.</li>
     *   <li>Confirma que, enquanto existir pelo menos um campo
     *       diferente considerado no equals(), os objetos não
     *       são iguais.</li>
     *   <li>Altera o campo divergente e verifica que os objetos
     *       passam a ser considerados iguais.</li>
     * </ul>
     */
    @Test
    public void equalsTest() {
        // Cria o primeiro utilizador e define todos os atributos.
        User o1 = new User();
        o1.setPasswordHash("hash");            // Hash de password (pode não ser usado no equals)
        o1.setEmail("abc@vaadin.com");         // Email (possivelmente usado no equals)
        o1.setFirstName("first");              // Primeiro nome
        o1.setLastName("last");                // Último nome
        o1.setRole("role");                    // Função ou perfil

        // Cria o segundo utilizador com alguns valores diferentes.
        User o2 = new User();
        o2.setPasswordHash("anotherhash");     // Hash de password diferente
        o2.setEmail("abc@vaadin.com");         // Mesmo email
        o2.setFirstName("anotherName");        // Primeiro nome diferente
        o2.setLastName("last");                // Último nome igual
        o2.setRole("role");                    // Função igual

        // Valida que, neste estado, os dois objetos NÃO são iguais
        // (devido ao primeiro nome diferente ou outros campos usados em equals).
        Assertions.assertNotEquals(o1, o2);

        // Ajusta o primeiro nome do segundo objeto para coincidir com o primeiro.
        o2.setFirstName("first");

        // Agora, com os campos relevantes iguais, os dois objetos devem ser considerados iguais.
        Assertions.assertEquals(o1, o2);
    }
}
